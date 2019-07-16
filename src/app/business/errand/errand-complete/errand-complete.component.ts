import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-errand-complete',
  templateUrl: './errand-complete.component.html',
  styleUrls: ['./errand-complete.component.css']
})
export class ErrandCompleteComponent implements OnInit {

  crumbs = {
    title: '出差管理',
    subTitle: '完善差程'
  };

  today = new Date();

  validateForm: FormGroup;

  errands: Array<any> = [];

  validTimeOutEvent: any;

  selectedErrand: any = {};

  receiveId = 0;

  isVisible = false;

  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute,
              public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      imperfectId: ['', []],
      start: ['', [Validators.required]],
      finish: ['', [Validators.required]],
      startAt: ['', [Validators.required]],
      finishAt: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.validateForm.controls['imperfectId'].setValue(this.receiveId);
      this.loadImperfect();
    });
  }

  /**
   * 加载行程列表（未完善的 本人的）
   */
  loadImperfect() {
    this.https.get(Urls.ERRAND.EDIT + this.receiveId).then(resp => {
      this.selectedErrand = resp['data'];
    });
  }

  /**
   * 加载行程
   */
  loadTrips(id) {
    this.https.get(Urls.IMPERFECT.TRIPS + id).then(resp => {
      console.log(resp);
    });
  }


  /**
   * 方法用途: 出差差程异步验证 没有被占用 TODO
   * 参数:
   **/
  errandAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    const _this = this;
    if (this.validTimeOutEvent) {
      clearTimeout(this.validTimeOutEvent);
    }
    this.validTimeOutEvent = setTimeout(function () {
      _this.https.get(Urls.IMPERFECT.COMPLETEVALID + control.value).then(resp => {
        if (resp['code'] === 200 && resp['data'] === true) {
          observer.next(null);
        }
        observer.complete();
      }, resp => {
        observer.next({error: true, duplicated: true});
        observer.complete();
      });
    }, 1000);
  })

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };
}

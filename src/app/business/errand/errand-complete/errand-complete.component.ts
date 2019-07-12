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

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute,
              public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      id: ['', []],
      errandId: ['', [Validators.required], [this.errandAsyncValidator]]
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
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
  });

}

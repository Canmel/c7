import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';

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

  savedTrips: Array<any> = [];

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

  deleteTrip(data: any) {
    console.log(data);
  }

  /**
   * 加载行程列表（未完善的 本人的）
   */
  loadImperfect() {
    this.https.get(Urls.ERRAND.EDIT + this.receiveId).then(resp => {
      this.selectedErrand = resp['data'];
    });

    this.loadTrips(this.receiveId);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    this.https.post(Urls.TRIP.SAVE, this.validateForm.value).then(resp => {
      this.isVisible = false;
      this.notification.success('成功', resp['msg']);
      this.loadImperfect();
    });
  }

  /**
   * 加载行程
   */
  loadTrips(id) {
    this.https.get(Urls.ERRAND.TRIPS + id).then(resp => {
      this.savedTrips = resp['data'];
    });
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

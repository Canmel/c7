import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
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

  validateRouteForm: FormGroup;

  savedTrips: Array<any> = [];

  selectedErrand: any = {};

  route: any = {};

  /**
   * 接受参数ID
   */
  receiveId = 0;

  /**
   * 车船票表单是否显示
   */
  isVisible = false;

  /**
   * 路线表单是否显示
   */
  isRouteVisible = false;

  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;

  startRouteValue: Date | null = null;
  endRouteValue: Date | null = null;
  endRouteOpen = false;

  startRouteBackValue: Date | null = null;
  endRouteBackValue: Date | null = null;
  endRouteBackOpen = false;

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private modalService: NzModalService,
              public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      imperfectId: ['', []],
      start: ['', [Validators.required]],
      finish: ['', [Validators.required]],
      startAt: ['', [Validators.required]],
      finishAt: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });

    this.validateRouteForm = this.fb.group({
      imperfectId: ['', []],
      come: ['', [Validators.required]],
      comeAt: ['', [Validators.required]],
      comeToAt: ['', [Validators.required]],
      comeTo: ['', [Validators.required]],
      back: ['', [Validators.required]],
      backTo: ['', [Validators.required]],
      backAt: ['', [Validators.required]],
      backToAt: ['', [Validators.required]]
    });
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.validateForm.controls['imperfectId'].setValue(this.receiveId);
      this.validateRouteForm.controls['imperfectId'].setValue(this.receiveId);
      this.loadImperfect();
    });
  }

  deleteTrip(data: any) {
    this.modalService.confirm({
      nzTitle: '您确定要删除这条由 【' + data['start'] + '】 到 【' + data['finish'] + '】 的行程吗？',
      nzContent: '<b style="color: red;">删除后无法恢复</b>',
      nzOkText: '确认',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.https.delete(Urls.TRIP.DELETE, data['id']).then(resp => {
          this.notification.success('成功', resp['msg']);
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  /**
   * 加载行程列表（未完善的 本人的）
   */
  loadImperfect() {
    this.https.get(Urls.ERRAND.EDIT + this.receiveId).then(resp => {
      this.selectedErrand = resp['data'];
    });

    this.loadTrips(this.receiveId);
    this.loadRoute(this.receiveId);
  }

  loadRoute(id) {
    this.https.get(Urls.ERRAND.ROUTES + id).then(resp => {
      this.route = resp['data'];
      console.log(resp);
    } );
  }

  showModal(): void {
    this.isVisible = true;
  }

  showRouteModal(): void {
    this.isRouteVisible = true;
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

  handleRouteOk() {
    for (const key in this.validateRouteForm.controls) {
      this.validateRouteForm.controls[key].markAsDirty();
      this.validateRouteForm.controls[key].updateValueAndValidity();
    }
    if (!this.validateRouteForm.valid) {
      return;
    }
    this.https.post(Urls.ROUTERS.SAVE, this.validateRouteForm.value).then(resp => {
      console.log('resp-------->', resp);
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

  handleRouteStartOpenChange(open: boolean): void {
    if (!open) {
      this.endRouteOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endRouteOpen);
  }

  handleRouteBackStartOpenChange(open: boolean): void {
    if (!open) {
      this.endRouteBackOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endRouteOpen);
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }

  handleRouteEndOpenChange(open: boolean): void {
    this.endRouteOpen = open;
  }

  handleRouteBackEndOpenChange(open: boolean): void {
    this.endRouteBackOpen = open;
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

  disabledRouteStartDate = (startRouteValue: Date): boolean => {
    if (!startRouteValue || !this.endRouteValue) {
      return false;
    }
    return startRouteValue.getTime() > this.endRouteValue.getTime();
  };
  disabledRouteEndDate = (endRouteValue: Date): boolean => {
    if (!endRouteValue || !this.startRouteValue) {
      return false;
    }
    return endRouteValue.getTime() <= this.startRouteValue.getTime();
  };

  disabledRouteBackStartDate = (startRouteValue: Date): boolean => {
    if (!startRouteValue || !this.endRouteBackValue) {
      return false;
    }
    return startRouteValue.getTime() > this.endRouteBackValue.getTime();
  };
  disabledRouteBackEndDate = (endRouteValue: Date): boolean => {
    if (!endRouteValue || !this.startRouteBackValue) {
      return false;
    }
    return endRouteValue.getTime() <= this.startRouteBackValue.getTime();
  };
}

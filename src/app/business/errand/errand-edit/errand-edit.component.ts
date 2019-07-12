import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';

@Component({
  selector: 'app-errand-edit',
  templateUrl: './errand-edit.component.html',
  styleUrls: ['./errand-edit.component.css']
})
export class ErrandEditComponent implements OnInit {
  crumbs = {
    title: '出差管理',
    subTitle: '修改出差'
  };

  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;

  applyUsers: Array<any>;
  applyUser: any;

  validateForm: FormGroup;

  constructor(public activatedRoute: ActivatedRoute, private fb: FormBuilder, public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      id: ['', []],
      uid: ['', [Validators.required]],
      username: ['', [Validators.required]],
      orgName: ['', []],
      orgId: ['', [Validators.required]],
      applyDate: ['', [Validators.required]],
      dateRangeStart: ['', [Validators.required]],
      dateRangeEnd: ['', [Validators.required]],
      planType: ['', [Validators.required]],
      plan: ['', [Validators.required]],
      target: ['', [Validators.required]],
      leader: ['', [Validators.max(0)]],
      director: ['', [Validators.max(0)]],
      operate: ['', [Validators.max(0)]],
      manager: ['', [Validators.max(0)]]
    });
  }

  ngOnInit() {
    this.loadApplyUser();
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.loadEntity(queryParams['id']);
    });
  }

  loadEntity(id) {
    this.https.get(Urls.ERRAND.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        id: entity['id'],
        uid: entity['uid'],
        username: entity['username'],
        orgName: entity['orgName'],
        orgId: entity['orgId'],
        applyDate: entity['applyDate'],
        dateRangeStart: entity['dateRangeStart'],
        dateRangeEnd: entity['dateRangeEnd'],
        planType: entity['planType'],
        plan: entity['plan'],
        target: entity['target'],
        leader: null,
        director: null,
        operate: null,
        manager: null
      });
    });
  }

  applyUserChange(value) {
    console.log(value);
    const _this = this;
    this.applyUsers.forEach(function (v, i) {
      if (value === v['uid']) {
        _this.applyUser = v;
      }
    });
    console.log(_this.applyUser);
    this.validateForm.controls['orgName'].setValue(_this.applyUser['orgName']);
    this.validateForm.controls['orgId'].setValue(_this.applyUser['orgNo']);
    this.validateForm.controls['username'].setValue(_this.applyUser['username']);
  }

  // 加载申请人选项
  loadApplyUser() {
    this.https.get(Urls.USERS.ALL).then(resp => {
      this.applyUsers = resp['data'];
      console.log(this.applyUsers);
    });
  }

  /**
   * 方法用途: 重置表单
   * 参数:  事件
   **/
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (key) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  /**
   * 方法用途: 提交表单
   * 参数: 事件， 表单值
   **/
  submitForm = ($event, value) => {
    $event.preventDefault();
    console.log(value);
    console.log(this.validateForm.value);
    this.https.put(Urls.ERRAND.UPDATE, this.validateForm.value).then(resp => {
      this.notification.success('成功', resp['msg']);
      this.router.navigate([Urls.BUSINESS.ERRAND.LIST]);
    });
  };

  onChange(result: Date): void {
    console.log('onChange: ', result);
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
}

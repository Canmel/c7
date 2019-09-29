import {Component, OnInit} from '@angular/core';
import {_i18n} from '../../../../public/i18n/i18n';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';

@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.css']
})
export class NoticeEditComponent implements OnInit {
  /** 属性用途: i18n **/
  _i18n = _i18n;

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '通知管理',
    subTitle: '修改通知'
  };

  receiveId = 0;

  validateForm: FormGroup;

  targetType: [];

  /**
   * 方法用途: 构造器构造验证对象
   * 参数:
   **/
  constructor(private fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      targetType: ['', [Validators.required]],
      remark: ['', []],
      targetValue: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadTargetType();
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      console.log(queryParams);
      this.loadEntityById(queryParams['id']);
    });
  }

  loadEntityById(id) {
    this.https.get(Urls.NOTICE.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        title: entity['title'],
        content: entity['content'],
        targetType: entity['targetType'],
        remark: entity['remark'],
        targetValue: entity['targetValue']
      });
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
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  /**
   * 方法用途: 提交表单
   * 参数: 事件， 表单值
   **/
  submitForm = ($event, value) => {
    $event.preventDefault();
    value['id'] = this.receiveId;
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.https.put(Urls.NOTICE.SAVE, value).then(resp => {
      if (resp['code'] === 200) {
        this.router.navigate([Urls.BUSINESS.NOTICE.LIST]);
        this.notification.success('成功', resp['msg']);
      } else {
        this.notification.error('失败', resp['msg']);
      }
    }, resp => {
      console.log(resp);
    });
  };

  loadTargetType() {
    this.https.get(Urls.NOTICE.TARGETTYPE).then(
      resp => {
        this.targetType = resp['data'];
        console.log(resp);
      },
      err => {
        console.log(err);
      });
  }

}

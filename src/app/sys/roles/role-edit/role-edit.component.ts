import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {Urls} from '../../../../public/url';
import {_i18n} from '../../../../public/i18n/i18n';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  _i18n = _i18n;
  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '用户管理',
    subTitle: '新建用户'
  };

  receiveId = 0;

  validateForm: FormGroup;

  validTimeOutEvent: any;

  /**
   * 方法用途: 提交表单
   * 参数: 事件， 表单值
   **/
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.https.put(Urls.ROLES.EDIT + this.receiveId, value).then(resp => {
        if (resp['httpStatus'] === 200) {
          this.router.navigate([Urls.BUSINESS.ROLES.LIST]);
          this.notification.success('成功', resp['msg']);
        } else {
          this.notification.error('失败', resp['msg']);
        }
      },
      resp => {
        console.log(resp);
      });
  };

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
   * 方法用途: 用户名称异步验证
   * 参数:
   **/
  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    const _this = this;
    if (this.validTimeOutEvent) {
      clearTimeout(this.validTimeOutEvent);
    }
    this.validTimeOutEvent = setTimeout(function () {
      _this.https.post(Urls.ROLES.VALIDROLENAME, {rolename: control.value, id: _this.receiveId}).then(resp => {
        console.log(resp);
        if (resp['httpStatus'] === 200) {
          observer.next(null);
        }
        observer.complete();
      }, resp => {
        observer.next({error: true, duplicated: true});
        observer.complete();
      });
    }, 1000);
  });

  /**
   * 方法用途: 构造器构造验证对象
   * 参数:
   **/
  constructor(private fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
              public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      rolename: ['', [Validators.required], [this.userNameAsyncValidator]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const _this = this;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.loadEntityById(queryParams['id']);
    });

  }

  loadEntityById(id) {
    this.https.get(Urls.ROLES.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        rolename: entity['rolename'],
        description: entity['description']
      });
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';
import {_i18n} from '../../../../public/i18n/i18n';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  /** 属性用途: i18n **/
  _i18n = _i18n;


  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '用户管理',
    subTitle: '新建用户'
  };

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
    this.https.post(Urls.USERS.SAVE, value).then(resp => {
      if (resp['httpStatus'] === 200) {
        this.router.navigate([Urls.BUSINESS.USERS.LIST]);
        this.notification.success('成功', resp['msg']);
      } else {
        this.notification.error('失败', resp['msg']);
      }
    }, resp => {
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
   * 方法用途: 验证确认密码
   * 参数: 无
   **/
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
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
      _this.https.post(Urls.USERS.VALIDUSERNAME, {username: control.value}).then(resp => {
        console.log(resp);
        if (resp['httpStatus'] === 200) {
          observer.next(null);
          observer.next({error: true, duplicated: true});
        }
        observer.complete();
      }, resp => {
        observer.next({error: true, duplicated: true});
        observer.complete();
      });
    }, 1000);
  })

  /**
   * 方法用途: 确认密码验证
   * 参数:
   **/
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
  };

  /**
   * 方法用途: 构造器构造验证对象
   * 参数:
   **/
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^1[34578]\\d{9}$')]],
      nickname: ['', [Validators.required, Validators.maxLength(6)]],
      remarke: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

}

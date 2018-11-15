import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {Urls} from '../../../../public/url';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

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
    this.https.put(Urls.USERS.EDIT + this.receiveId, value).then(resp => {
        if (resp['httpStatus'] === 200) {
          this.router.navigate([Urls.BUSINESS.USERS.LIST]);
          this.notification.success('成功', resp['msg']);
        } else {
          this.notification.error('失败', resp['msg']);
        }
      },
      resp => {
        console.log(resp);
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
   * 方法用途: 用户名称异步验证
   * 参数:
   **/
  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    this.https.post(Urls.USERS.VALIDUSERNAME, {username: control.value, id: this.receiveId}).then(resp => {
      console.log(resp);
      if (resp['httpStatus'] === 200) {
        observer.next(null);
      }
      observer.complete();
    }, resp => {
      observer.next({error: true, duplicated: true});
      observer.complete();
    });
  });

  /**
   * 方法用途: 构造器构造验证对象
   * 参数:
   **/
  constructor(private fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
              public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required], [this.userNameAsyncValidator]],
      nickname: ['', [Validators.required, Validators.maxLength(6)]],
      email: ['', [Validators.email]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^1[34578]\\d{9}$')]],
      remarke: ['', [Validators.required]]
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
    this.https.get(Urls.USERS.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        username: entity['username'],
        nickname: entity['nickname'],
        email: entity['email'],
        address: entity['address'],
        mobile: entity['mobile'],
        remarke: entity['remarke']
      });
    });

  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Urls} from '../../../../public/url';
import {Observable, Observer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '菜单管理',
    subTitle: '新建菜单'
  };

  receiveId = 0;

  validateForm: FormGroup;

  validTimeOutEvent: any;

  menuLevels: [
    {name: '一级菜单', value: 1},
    {name: '二级菜单', value: 2}
    ];

  formData = {};

  topMenus = [];

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
    this.https.post(Urls.ROLES.SAVE, value).then(resp => {
      if (resp['httpStatus'] === 200) {
        this.router.navigate([Urls.BUSINESS.ROLES.LIST]);
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
   * 方法用途: 菜单名称异步验证
   * 参数:
   **/
  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    const _this = this;
    if (this.validTimeOutEvent) {
      clearTimeout(this.validTimeOutEvent);
    }
    this.validTimeOutEvent = setTimeout(function () {
      _this.https.post(Urls.MENUS.VALIDMENUNAME, {menuname: control.value, id: _this.receiveId}).then(resp => {
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
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils,
              public activatedRoute: ActivatedRoute, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      menuname: ['', [Validators.required], [this.userNameAsyncValidator]],
      description: ['', [Validators.required]],
      level: ['', Validators.required],
      pid: ['', [], [this.subMenuValidator]]
    });
    this.https.get(Urls.OPTIONS.MENUS.LEVEL).then(data => {
      this.menuLevels = data['data'];
    });
    const _this = this;
    this.https.get(Urls.MENUS.TOPMENUS).then(data => {
      $.each(data['data'], function (index, item) {
        _this.topMenus.push({name: item['menuname'], value: item['id']});
      });
    });
  }

  subMenuValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    if (this.formData['menuLevels'] && this.formData['menuLevels'] === '2'
      && !control.value) {
      observer.next({error: true, duplicated: true});
    } else {
      observer.next(null);
    }
    observer.complete();
  });

  nzListOfSelectedValueChange() {
    this.validateForm.controls['pid'].markAsPristine();
    this.validateForm.controls['pid'].updateValueAndValidity();
  }

  ngOnInit() {
    const _this = this;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.loadEntityById(queryParams['id']);
    });
  }

  loadEntityById(id) {
    this.https.get(Urls.MENUS.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        menuname: entity['menuname'],
        description: entity['description'],
        level: entity['level'],
        pid: entity['pid']
      });
    });

    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

}

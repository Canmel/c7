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
    { name: '一级菜单', value: 0 },
    { name: '二级菜单', value: 1 }
    ];

  formData = {};

  topMenus = [];

  /**
   * 方法用途: 提交表单
   * 参数: 事件， 表单值
   **/
  submitForm = ($event, value) => {
    value['menuId'] = this.receiveId;
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      if (key) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    this.https.put(Urls.MENUS.SAVE, value).then(resp => {
      if (resp['code'] === 200) {
        this.router.navigate([Urls.BUSINESS.MENUS.LIST]);
        this.notification.success('成功', resp['msg']);
      } else {
        this.notification.error('失败', resp['msg']);
      }
    }, resp => {
      this.notification.error('失败', resp['msg']);
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
      if (key) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  /**
   * 方法用途: 菜单名称异步验证
   * 参数:
   **/
  menuNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    const _this = this;
    if (this.validTimeOutEvent) {
      clearTimeout(this.validTimeOutEvent);
    }
    this.validTimeOutEvent = setTimeout(function () {
      _this.https.get(Urls.MENUS.VALIDMENUNAME + control.value + '?id=' + _this.receiveId).then(resp => {
        console.log(resp);
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

  /**
   * 方法用途: 构造器构造验证对象
   * 参数:
   **/
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils,
              public activatedRoute: ActivatedRoute, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required], [this.menuNameAsyncValidator]],
      url: ['', [Validators.required]],
      type: ['', Validators.required],
      parentId: ['', [], [this.subMenuValidator]]
    });
    this.https.get(Urls.OPTIONS.MENUS.LEVEL).then(data => {
      this.menuLevels = data['data'];
    });
    const _this = this;
    this.https.get(Urls.MENUS.TOPMENUS).then(data => {
      $.each(data['data'], function (index, item) {
        _this.topMenus.push({name: item['name'], value: item['menuId']});
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
    this.validateForm.controls['parentId'].markAsPristine();
    this.validateForm.controls['parentId'].updateValueAndValidity();
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
        name: entity['name'],
        url: entity['url'],
        type: entity['type'],
        parentId: entity['parentId']
      });
    });

    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

}

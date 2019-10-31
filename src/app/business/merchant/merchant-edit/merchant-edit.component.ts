import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css']
})
export class MerchantEditComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '客商管理',
    subTitle: '客商维护'
  };

  /**
   * 接收上层传来的主键
   */
  receiveId = 0;

  Urls = Urls;

  validateForm: FormGroup;

  /**
   * 方法用途: 提交表单
   * 参数:  事件
   **/
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.https.put(Urls.ZS_MERCHANT.UPDATE, value).then(resp => {
      if (resp['code'] === 200) {
        this.router.navigate([Urls.BUSINESS.MERCHANT.LIST]);
        this.notification.success('成功', resp['msg']);
      } else {
        this.notification.error('失败', resp['msg']);
      }
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
   * 构造器
   * @param fb 表单构造器
   * @param router  路由
   * @param https   网络请求
   * @param notification  提示工具
   */
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils,
              public activatedRoute: ActivatedRoute, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      manager: ['', []],
      addr: ['', []],
      mainBusiness: ['', []],
      intention: ['', []],
      contacts: ['', []],
      contactsPost: ['', []],
      contactsPhone: ['', []],
      source: ['', []],
      attribute: ['', []]
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.loadEntity(queryParams['id']);
    });
  }

  /**
   * 通过主键加载当前实体类详细信息
   */
  loadEntity(id) {
    this.https.get(Urls.ZS_MERCHANT.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        id: entity['id'],
        name: entity['name'],
        manager: entity['manager'],
        addr: entity['addr'],
        mainBusiness: entity['mainBusiness'],
        intention: entity['intention'],
        contacts: entity['contacts'],
        contactsPost: entity['contactsPost'],
        contactsPhone: entity['contactsPhone'],
        source: entity['source'],
        attribute: entity['attribute']
      });
    });
  }

}

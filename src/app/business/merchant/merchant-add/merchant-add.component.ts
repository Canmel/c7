import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';

@Component({
  selector: 'app-merchant-add',
  templateUrl: './merchant-add.component.html',
  styleUrls: ['./merchant-add.component.css']
})
export class MerchantAddComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '客商管理',
    subTitle: '客商维护'
  };

  validateForm: FormGroup;

  Urls = Urls;

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
    this.https.post(Urls.ZS_PROJECT.SAVE, value).then(resp => {
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
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
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
  }

}

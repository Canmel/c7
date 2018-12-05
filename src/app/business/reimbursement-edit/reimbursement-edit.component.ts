import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../public/url';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-reimbursement-edit',
  templateUrl: './reimbursement-edit.component.html',
  styleUrls: ['./reimbursement-edit.component.css']
})
export class ReimbursementEditComponent implements OnInit {

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
    this.https.put(Urls.REIMBURSEMENT.EDIT + this.receiveId, value).then(resp => {
        if (resp['httpStatus'] === 200) {
          this.router.navigate([Urls.BUSINESS.REIMBURSEMENT.LIST]);
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
   * 方法用途: 构造器构造验证对象
   * 参数:
   **/
  constructor(private fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
              public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]]
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
    this.https.get(Urls.REIMBURSEMENT.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        name: entity['name'],
        description: entity['description'],
        amount: entity['amount']
      });
    });
  }
}

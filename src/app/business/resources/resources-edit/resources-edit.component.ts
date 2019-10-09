import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-resources-edit',
  templateUrl: './resources-edit.component.html',
  styleUrls: ['./resources-edit.component.css']
})
export class ResourcesEditComponent implements OnInit {
  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '项目管理',
    subTitle: '资源管理'
  };

  /**
   * 接收上层传来的主键
   */
  receiveId = 0;

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
      name: ['', [Validators.required]]
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
    this.validateForm.setValue({
      name: '资源名称'
    });
  }
}

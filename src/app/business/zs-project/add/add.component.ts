import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs = {
    title: '项目管理',
    subTitle: '招商项目'
  };

  Urls = Urls;

  validateForm: FormGroup;

  projectLevels = [];

  selectedLevel;

  allManager = [];

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
        this.router.navigate([Urls.BUSINESS.ZS_PROJECT.LIST]);
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
   * 构造器
   * @param fb 表单构造器
   * @param router  路由
   * @param https   网络请求
   * @param notification  提示工具
   */
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      business: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      level: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadProjectManager();
    this.loadProjectLevels();
  }

  loadProjectLevels() {
    this.https.get(Urls.ZS_PROJECT.LEVELS).then(resp => {
      console.log(resp['data']);
      this.projectLevels = resp['data'];
    });
  }

  /**
   * 加载项目负责人
   */
  loadProjectManager() {
    this.https.get(Urls.USERS.ALL).then(resp => {
      this.allManager = resp['data'];
    });
  }


}

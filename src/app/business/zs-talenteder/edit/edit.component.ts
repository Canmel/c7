import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Urls} from '../../../../public/url';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '菜单管理',
    subTitle: '新建菜单'
  };

  /**
   * 接收上层传来的主键
   */
  receiveId = 0;

  validateForm: FormGroup;

  projects: [];

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
    this.https.put(Urls.ZS_TALENTEDER.UPDATE, value).then(resp => {
      if (resp['code'] === 200) {
        this.router.navigate([Urls.BUSINESS.TALENTEDER.LIST]);
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
   * @param activatedRoute 路由
   */
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils,
              private activatedRoute: ActivatedRoute, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      contactPhone: ['', [Validators.required, Validators.pattern('^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$'),
        Validators.maxLength(11)]],
      remark: ['', [Validators.required]],
      projectId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadProjects();
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.loadEntity(queryParams['id']);
    });
  }

  /**
   * 通过主键加载当前实体类详细信息
   */
  loadEntity(id) {
    this.https.get(Urls.ZS_TALENTEDER.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        id: entity['id'],
        name: entity['name'],
        gender: entity['gender'] ? entity['gender']['value'] : '',
        contactPhone: entity['contactPhone'],
        remark: entity['remark'],
        projectId: entity['projectId']
      });
    });
  }

  loadProjects() {
    this.https.get(Urls.ZS_PROJECT.ALL).then(resp => {
      this.projects = resp['data'];
    });
  }

}

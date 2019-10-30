import {Component, OnInit} from '@angular/core';
import {Urls} from '../../../../public/url';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';

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
  crumbs = {
    title: '项目管理',
    subTitle: '招商项目'
  };

  Urls = Urls;

  receiveId = 0;

  industryType;

  validateForm: FormGroup;

  projectLevels = [];

  projectTypies = [];

  industryTypies = [];

  allManager = [];

  selectedUser;

  type;

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
    this.https.put(Urls.ZS_PROJECT.SAVE, value).then(resp => {
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
  constructor(private fb: FormBuilder, public router: Router, public https: HttpsUtils, private notification: NzNotificationService,
              public activatedRoute: ActivatedRoute) {
    this.validateForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      amount: ['', []],
      place: ['', [Validators.required]],
      business: ['', [Validators.required]],
      managerId: ['', [Validators.required]],
      level: ['', [Validators.required]],
      areaSize: ['', []],
      type: ['', [Validators.required]],
      industryType: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadProjectLevels();
    this.loadProjectTypies();
    this.loadIndustryTypies();
    this.loadProjectManager();
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.loadEntity(this.receiveId);
    });
  }

  /**
   * 通过主键加载当前实体类详细信息
   */
  loadEntity(id) {
    this.https.get(Urls.ZS_PROJECT.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        id: entity['id'],
        name: entity['name'],
        amount: entity['amount'],
        code: entity['code'],
        business: entity['business'],
        managerId: entity['managerId'],
        level: entity['level']['value'],
        areaSize: entity['areaSize'],
        type: entity['type'] ? entity['type']['value'] : '',
        industryType: entity['industryType'] ? entity['industryType']['value'] : '',
        place: entity['place']
      });
    });
  }

  loadProjectLevels() {
    this.https.get(Urls.ZS_PROJECT.LEVELS).then(resp => {
      this.projectLevels = resp['data'];
    });
  }

  loadProjectTypies() {
    this.https.get(Urls.ZS_PROJECT.TYPIES).then(resp => {
      this.projectTypies = resp['data'];
    });
  }

  loadIndustryTypies() {
    this.https.get(Urls.ZS_PROJECT.INDUSTRYTYPIES).then(resp => {
      this.industryTypies = resp['data'];
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

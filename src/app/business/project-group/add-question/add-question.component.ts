import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {Properties} from '../../../../public/properties';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../public/url';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {


  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '问卷管理',
    subTitle: '添加问题'
  };

  /**
   * 接收上层传来的主键
   */
  receiveId = 0;

  selectedIndex = 0;

  savedOptions = [];

  /**
   * 表头
   */
  listHeader = [
    {title: '题目标题', field: 'name', type: 'text', class: 'text-success'},
    {title: '类型', field: 'type.name', type: 'muilti-text', class: Properties.STRING.COLOR.STATUS},
    {title: '创建时间', field: 'createdAt', type: 'date'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  /**
   * 单选表单
   */
  validateDxtForm: FormGroup;


  /**
   * 多选表单
   */
  validateDuoxtForm: FormGroup;

  /**
   * 表单
   */
  validateForm: FormGroup;


  selectedValidateForm: FormGroup;

  constructor(public activatedRoute: ActivatedRoute, public router: Router, public https: HttpsUtils, public fb: FormBuilder,
              private notification: NzNotificationService) {
    this.validateDxtForm = this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      options: ['', []]
    });

    this.validateDuoxtForm = this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });

    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });

    this.selectedValidateForm = this.validateDxtForm;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.loadQuestionsByNaire();
    });
  }

  /**
   * 通过问卷查询题目
   */
  loadQuestionsByNaire() {

  }

  /**
   * 标签选择回调
   */
  selectChange(args: any[]): void {
    if (args['index'] === 0) {
      this.selectedValidateForm = this.validateDxtForm;
    }
    if (args['index'] === 1) {
      this.selectedValidateForm = this.validateDuoxtForm;
    }
  }

  /**
   * 方法用途: 提交表单
   * 参数:  事件
   **/
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.selectedValidateForm.controls) {
      this.selectedValidateForm.controls[key].markAsDirty();
      this.selectedValidateForm.controls[key].updateValueAndValidity();
    }
    alert(123);
    console.log(value);
    // this.https.post(Urls.QUESTION.SAVE, value).then(resp => {
    //   if (resp['code'] === 200) {
    //     this.router.navigate([Urls.BUSINESS.PROJECT_GROUP.LIST]);
    //     this.notification.success('成功', resp['msg']);
    //   } else {
    //     this.notification.error('失败', resp['msg']);
    //   }
    // });
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
   * 添加选项
   */
  addOption() {
    console.log(this.validateDxtForm.value['options']);
    if (this.validateDxtForm.value['options'] !== '') {
      this.savedOptions.push(this.validateDxtForm.value['options']);
    }
    this.validateDxtForm.setValue({type: this.validateDxtForm.value['type'], title: this.validateDxtForm.value['title'], options: ''});
  }


}

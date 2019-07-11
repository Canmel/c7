import { Component, OnInit } from '@angular/core';
import {_i18n} from '../../../public/i18n/i18n';
import {Urls} from '../../../public/url';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.css']
})
export class MacrosComponent implements OnInit {

  _i18n = _i18n;

  crumbs = {
    title: '通用字典',
    subTitle: '字典列表'
  };

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: null,
    pageSize: 10,
    pageNum: 1,
    name: ''
  };

  /**
   * 表头
   */
  listHeader = [
    {title: '字段名称', field: 'name', type: 'text', class: 'text-success'},
    {title: '字典代码', field: 'code', type: 'text'},
    {title: '值', field: 'value', type: 'text'},
    {title: '类型', field: 'type', type: 'text'},
    {title: '序号', field: 'orderNum', type: 'text'},
    {title: '备注', field: 'remark', type: 'text'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  macros: Array<any> = [];

  constructor(public router: Router,
              public modalService: NzModalService,
              public https: HttpsUtils,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.loadEntities();
  }

  /**
   * 方法用途: 加载列表信息
   * 参数：
   **/
  loadEntities() {
    this.https.get(Urls.MACRO.PAGEQUERY, this.formData).then(resp => {
      this.macros = resp['data']['list'];
      this.formData.pageNum = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
    }, error => {
      this.notification.error('错误', error['error']['msg'] || error['message'] );
    });
  }

}

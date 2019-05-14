import { Component, OnInit } from '@angular/core';
import {_i18n} from '../../../public/i18n/i18n';

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
    currentPage: 1,
    name: ''
  };

  /**
   * 表头
   */
  listHeader = [
    {title: '用户名', field: 'username', type: 'text', class: 'text-success'},
    {title: '昵称', field: 'nickname', type: 'text'},
    {title: '邮箱', field: 'email', type: 'number'},
    {title: '电话', field: 'mobile', type: 'text'},
    {title: '上次登录时间', field: 'lastLoginTime', type: 'phone'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  macros: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}

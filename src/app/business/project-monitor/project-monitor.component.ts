import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-project-monitor',
  templateUrl: './project-monitor.component.html',
  styleUrls: ['./project-monitor.component.css']
})
export class ProjectMonitorComponent implements OnInit {

  isMaterialVisible = false;
  /**
   * 页头
   */
  crumbs = {
    title: '项目管理',
    subTitle: '项目流程监控'
  };

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: 21,
    pageSize: 10,
    pageNum: 1,
    name: ''  // 搜索项目名称
  };

  /**
   * 表头
   */
  listHeader = [
    {title: '项目 名称', field: 'name', type: 'text', class: 'text-success'},
    {title: '编号', field: 'code', type: 'text'},
    {title: '状态', field: 'status', type: 'text'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  /**
   * 表格数据
   */
  entities: Array<any> = [];

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
  }

  ngOnInit() {
    this.loadEntities();
  }

  /**
   * 加载列表
   */
  loadEntities() {
    // this.https.get(Urls.MENUS.PAGEQUERY, this.formData).then(resp => {
    //   this.entities = resp['data']['list'];
    //   this.formData.pageNum = resp['data']['pageNum'];
    //   this.formData.totalNum = resp['data']['total'];
    // });

    this.entities = [
      {name: '城西大市场招商', code: 'NO2911112201', status: '正常'},
      {name: '城西大市场招商', code: 'NO2911112201', status: '正常'},
      {name: '城西大市场招商', code: 'NO2911112201', status: '逾期'}
    ];
  }

  /**
   * 删除
   * @param param
   */
  material(param) {
    this.isMaterialVisible = true;
  }

  handleOk() {
    this.isMaterialVisible = false;
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.MONITOR.EDIT], {queryParams: param});
  }

}

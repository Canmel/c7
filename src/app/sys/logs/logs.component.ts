import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  crumbs = {
    title: '日志管理',
    subTitle: '日志列表'
  };

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: 21,
    pageSize: 10,
    currentPage: 1,
    module: ''
  };

  /**
   * 表头
   */
  listHeader = [
    {title: '所属模块', field: 'module', type: 'text', class: 'text-success'},
    {title: '方法', field: 'method', type: 'text'},
    {title: '参数', field: 'params', type: 'text'},
    {title: '描述', field: 'operation', type: 'text'},
    {title: '响应时间', field: 'time', type: 'text'},
    {title: '用户', field: 'username', type: 'text'}
  ];

  entities: Array<any> = [];


  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
  }

  ngOnInit() {
    this.loadEntities();
  }

  /**
   * 方法用途: 加载列表信息
   * 参数：
   **/
  loadEntities() {
    this.https.get(Urls.LOGS.PAGEQUERY, this.formData).then(resp => {
      this.entities = resp['data']['list'];
      this.formData.currentPage = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.MENUS.EDIT], {queryParams: param});
  }

  /**
   * 方法用途: 删除
   * 参数：
   **/
  remove(param) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + param['menuname'] + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        const _this = this;
        this.https.delete(Urls.ROLES.DELETE, param['id']).then(resp => {
          if (resp['httpStatus'] === 200) {
            _this.notification.success('成功', resp['msg']);
          } else {
            _this.notification.error('失败', resp['msg']);
          }
          _this.loadEntities();
        }, resp => {
          console.log(resp);
        });
      },
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
    console.log(param);
  }
}

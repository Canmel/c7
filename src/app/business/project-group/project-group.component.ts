import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.css']
})
export class ProjectGroupComponent implements OnInit {

  /**
   * 页头
   */
  crumbs = {
    title: '项目管理',
    subTitle: '项目组维护'
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
    {title: '项目组名称', field: 'name', type: 'text', class: 'text-success'},
    {title: '备注', field: 'code', type: 'text'},
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
      {name: '城西项目组', code: 'NO2911112201', status: '正常'},
      {name: '城东项目组', code: 'NO2911112201', status: '正常'},
      {name: '城南项目组', code: 'NO2911112201', status: '正常'}
    ];
  }

  /**
   * 删除
   * @param param
   */
  remove(param) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + param['name'] + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.notification.success('成功', '删除成功');
        // const _this = this;
        // this.https.delete(Urls.MENUS.DELETE + param['menuId']).then(resp => {
        //   if (resp['code'] === 200) {
        //     _this.notification.success('成功', resp['msg']);
        //   } else {
        //     _this.notification.error('失败', resp['msg']);
        //   }
        //   _this.loadEntities();
        // }, resp => {
        //   console.log(resp);
        // });
      },
      nzCancelText: '否',
      nzOnCancel: () => console.log('操作取消')
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.PROJECT_GROUP.EDIT], {queryParams: param});
  }
}
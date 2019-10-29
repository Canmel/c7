import { Component, OnInit } from '@angular/core';
import {Urls} from '../../../public/url';
import {Properties} from '../../../public/properties';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@Component({
  selector: 'app-zs-ground',
  templateUrl: './zs-ground.component.html',
  styleUrls: ['./zs-ground.component.css']
})
export class ZsGroundComponent implements OnInit {

  /**
   * 页头
   */
  crumbs = {
    title: '资源管理',
    subTitle: '地块信息'
  };

  Urls = Urls;

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
    {title: '线索名称', field: 'name', type: 'text', class: 'text-success'},
    {title: '所属项目', field: 'project.name', type: 'muilti-text', class: Properties.STRING.COLOR.STATUS},
    {title: '线索信息', field: 'business', type: 'text'},
    {title: '创建时间', field: 'createdAt', type: 'date'},
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
    this.https.get(Urls.ZS_GROUND.PAGEQUERY, this.formData).then(resp => {
      this.entities = resp['data']['list'];
      this.formData.pageNum = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
    });
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
        const _this = this;
        this.https.delete(Urls.ZS_CLUE.DELETE + param['id']).then(resp => {
          if (resp['code'] === 200) {
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
      nzOnCancel: () => console.log('操作取消')
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.ZS_GROUND.EDIT], {queryParams: param});
  }

}

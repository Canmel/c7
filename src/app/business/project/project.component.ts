import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {Properties} from '../../../public/properties';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  /**
   * 页头
   */
  crumbs = {
    title: '项目管理',
    subTitle: '项目维护'
  };

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: 21,
    pageSize: 10,
    pageNum: 1,
    pname: ''  // 搜索项目名称
  };

  /**
   * 表头
   */
  listHeader = [
    {title: '调问名称', field: 'pname', type: 'text', class: 'text-success'},
    {title: '调问编号', field: 'code', type: 'text'},
    {title: '收集份数', field: 'collectCopies', type: 'text'},
    {title: '类型', field: 'type.name', type: 'muilti-text', class: Properties.STRING.COLOR.TYPE},
    {title: '状态', field: 'status.name', type: 'muilti-text', class: Properties.STRING.COLOR.STATUS},
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
    this.https.get(Urls.PROJECT.PAGEQUERY, this.formData).then(resp => {
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
      nzTitle: '你确定要删除 ' + param['pname'] + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        const _this = this;
        this.https.delete(Urls.PROJECT.DELETE + param['id']).then(resp => {
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
   * 发布
   * @param item
   */
  release(item) {
    this.modalService.confirm({
      nzTitle: '你确定要发布 ' + item['pname'] + '?',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.https.get(Urls.PROJECT.RELEASE + item['id']).then(resp => {
          this.notification.success('成功', resp['msg']);
          this.loadEntities();
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
    this.router.navigate([Urls.BUSINESS.PROJECT.EDIT], {queryParams: param});
  }

}

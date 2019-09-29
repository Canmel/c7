import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  crumbs = {
    title: '通知管理',
    subTitle: '通知列表'
  };

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: 21,
    pageSize: 10,
    pageNum: 1,
    title: ''
  };

  /**
   * 表头
   */
  listHeader = [
    {title: '标题', field: 'title', type: 'text', class: 'text-success'},
    {title: '描述', field: 'remark', type: 'text'},
    {title: '创建时间', field: 'createdAt', type: 'text'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
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
    this.https.get(Urls.NOTICE.PAGEQUERY, this.formData).then(resp => {
      this.entities = resp['data']['list'];
      this.formData.pageNum = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    console.log(param);
    this.router.navigate([Urls.BUSINESS.NOTICE.EDIT], {queryParams: param});
  }

  /**
   * 方法用途: 删除
   * 参数：
   **/
  remove(param, username) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + param['title'] + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteNotice(param),
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  toTop(param) {
    this.https.put(Urls.NOTICE.TOP + param['id'], {}).then(
      resp => {
        this.loadEntities();
        this.notification.success('成功', resp['msg']);
      }
    );
  }

  pushNotice(param) {
    this.https.put(Urls.NOTICE.PUSH + param['id'], {}).then(
      resp => {
        this.loadEntities();
        this.notification.success('成功', resp['msg']);
      }
    );
  }

  deleteNotice(params) {
    const _this = this;
    this.https.delete(Urls.NOTICE.DELETE + params['id']).then(resp => {
      if (resp['code'] === 200) {
        _this.notification.success('成功', resp['msg']);
      } else {
        _this.notification.error('失败', resp['msg']);
      }
      _this.loadEntities();
    });
  }

}

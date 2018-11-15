import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  crumbs = {
    title: '角色管理',
    subTitle: '角色列表'
  };

  ses = 1;

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  pageination: any = {
    totalNum: 21,
    pageSize: 10,
    currentPage: 1
  };

  /**
   * 表头
   */
  listHeader = [
    {title: '角色名称', field: 'rolename', type: 'text', class: 'text-success'},
    {title: '描述', field: 'description', type: 'number'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  roles: Array<any> = [];


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
    console.log(this.pageination);
    this.https.get(Urls.ROLES.PAGEQUERY, this.pageination).then(resp => {
      this.roles = resp['data']['records'];
      this.pageination.currentPage = resp['data']['current'];
      this.pageination.totalNum = resp['data']['total'];
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.ROLES.EDIT], {queryParams: param});
  }

  /**
   * 方法用途: 删除
   * 参数：
   **/
  remove(param, username) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + username + '?',
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

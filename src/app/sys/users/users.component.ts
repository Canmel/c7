import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {_i18n} from '../../../public/i18n/i18n';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  /** 属性用途: i18n **/
  _i18n = _i18n;

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '用户管理',
    subTitle: '用户列表'
  };

  isVisible = false;

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: null,
    pageSize: 10,
    currentPage: 1,
    username: ''
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

  users: Array<any> = [];

  nodes = [];

  userRole = {
    uid: 0,
    roleIds: []
  };

  constructor(public router: Router,
              public modalService: NzModalService,
              public https: HttpsUtils,
              private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * 方法用途: 加载列表信息
   * 参数：
   **/
  loadUsers() {
    this.https.get(Urls.USERS.PAGEQUERY, this.formData).then(resp => {
      this.users = resp['data']['list'];
      this.formData.curPage = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
    }, error => {
      console.log(123123);
      alert(12);
      this.notification.error('错误', error['error']['msg'] || error['message'] );
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.USERS.EDIT], {queryParams: param});
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
      nzOnOk: () => this.deleteUser(param),
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteUser(params) {
    const _this = this;
    this.https.delete(Urls.USERS.DELETE, params['id']).then(resp => {
      if (resp['code'] === 200) {
        _this.notification.success('成功', resp['msg']);
      } else {
        _this.notification.error('失败', resp['msg']);
      }
      _this.loadUsers();
    });
  }

  editRoles(param, username) {
    this.loadRoleEntities();
    this.loadEntityById(param['id']);
    this.userRole.uid = param['id'];
    this.isVisible = true;
  }

  loadRoleEntities() {
    const _this = this;
    this.https.get(Urls.ROLES.ALL).then(resp => {
      _this.nodes = [];
      $.each(resp['data'], function (index, item) {
        _this.nodes.push({
          title: item['roleName']  + '(' +  item['remark'] + ')',
          key: item['roleId']
        });
      });
    });

  }

  handleOk() {
    this.isVisible = false;
    this.https.post(Urls.USERS.ROLES, this.userRole).then(
      resp => {
        if (resp['code'] === 200) {
          this.notification.success('成功', resp['msg']);
        } else {
          this.notification.error('失败', resp['msg']);
        }
      }
    );
  }

  handleCancel() {
    this.isVisible = false;
  }

  loadEntityById(id) {
    this.https.get(Urls.USERS.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.userRole.roleIds = entity['roleIds'];
      console.log(this.userRole);
    });
  }
}

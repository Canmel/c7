import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '用户管理',
    subTitle: '用户列表'
  };

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
    {title: '邮箱', field: 'email', type: 'number'},
    {title: '电话', field: 'mobile', type: 'phone'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  users: Array<any> = [];


  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils) {
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
      this.users = resp['data']['records'];
      this.formData.curPage = resp['data']['current'];
      this.formData.totalNum = resp['data']['total'];
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
      nzOnOk: () => console.log(param),
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
    console.log(param);
  }

  
}

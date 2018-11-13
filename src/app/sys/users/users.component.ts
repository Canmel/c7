import {Component, OnInit} from '@angular/core';
import {ListDirective} from '../../../public/list/list.directive';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends ListDirective implements OnInit {
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
  pageination: any = {
    totalNum: 21,
    pageSize: 10,
    curPage: 2
  };

  /**
   * 属性描述: 列表表头
   * 参数：title: 显示的表头名称
   *       field: 表头属性名称, (option： 参数列)
   *       width: 表格宽度
   *       event: (自定义图表事件)
   *          [
   *              icon: 图标
   *              url: 如果存在，直接打开url
   *              cback: 点击回调
   *          ]
   *
   **/
  listHeader = [
    {title: '用户名', field: 'username', type: 'text', class: 'text-success'},
    {title: '邮箱', field: 'email', type: 'number'},
    {title: '电话', field: 'phone', type: 'phone'},
    {
      title: '操作', field: 'option', type: 'opt', width: '10%',
      events: [{
        icon: 'fa-edit', url: '/app/users/edit'
      }, {
        icon: 'fa-trash-o', cback: function (index, row) {
          console.log(index, row);
          console.log('我接收到了' + index + '--  并且开始发射了', row);
        }
      }]
    }
  ];

  users = [
    {phone: '18357162602', username: '大欢', email: '892379244@qq.com', id: 1},
    {phone: '13555488765', username: '小于', email: '778922711@qq.com', id: 2},
    {phone: '17798982221', username: '黎明', email: '812322244@qq.com', id: 3}
  ];


  /**
   * 方法用途: 父子组件通讯方法用来接收子组件（用户列表listComponent）发出的事件
   * 参数：event: 事件
   **/
  priceQuoteHandler(event: any) {
    if (event['url']) {
      this.router.navigate([event.url]);
    }
  }

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
  }

}

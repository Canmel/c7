import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  crumbs = {
    title: '用户详情'
  };

  userDetails = {
    username: '张三',
    address: '浙江省杭州市西湖区',
    phone: '18357162602',
    email: '892379244@qq.com',
    desc: '我爱北京天安门，天安门外很冷啊，早上早点去，晚上早点回， 晚上风大，不能一直在户外的，如果一直在户外会让人心碎，毕竟这是北京...'
  };

  userLogs = [
    {title: '删除用户', date: '208-10-12 09:21:22', desc: '用户 张三 删除用户 "祝覅是" '},
    {title: '删除用户', date: '208-10-13 01:21:44', desc: '用户 张三 删除用户 "张筱雨" '},
    {title: '新建用户', date: '208-10-15 13:21:s2', desc: '用户 张三 新建用户 "材料管理员" '},
    {title: '新建角色', date: '208-10-12 16:53:22', desc: '用户 张三 新建角色 "admin" '},
    {title: '新建角色', date: '208-10-12 16:53:22', desc: '用户 张三 新建角色 "admin" '},
    {title: '新建角色', date: '208-10-12 16:53:22', desc: '用户 张三 新建角色 "admin" '},
    {title: '新建角色', date: '208-10-12 16:53:22', desc: '用户 张三 新建角色 "admin" '},
    {title: '新建角色', date: '208-10-12 16:53:22', desc: '用户 张三 新建角色 "admin" '},
    {title: '新建角色', date: '208-10-12 16:53:22', desc: '用户 张三 新建角色 "admin" '},
    {title: '新建角色', date: '208-10-12 16:53:22', desc: '用户 张三 新建角色 "admin" '}

  ];

  constructor() {
  }

  ngOnInit() {
  }

}

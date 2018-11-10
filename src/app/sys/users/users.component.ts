import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  crumbs: any = {
    title: '用户管理',
    subTitle: '用户列表'
  };

  pageination: any = {
    totalNum: 21,
    pageSize: 10,
    curPage: 1
  }

  constructor() { }

  ngOnInit() {
  }

}

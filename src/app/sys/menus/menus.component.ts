import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  crumbs = {
    title: '菜单管理',
    subTitle: '菜单列表'
  };

  constructor() { }

  ngOnInit() {
  }

}

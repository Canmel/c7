import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lefter',
  templateUrl: './lefter.component.html',
  styleUrls: ['./lefter.component.css']
})
export class LefterComponent implements OnInit {

  menusData = {
    menuList: [
      {href: '/app/home', active: 'active', menuname: '首页', icon: 'icon-disc icon text-success'},
      {href: '/app/users', active: null, menuname: 'Genres', icon: 'icon-music-tone-alt icon text-info'},
      {href: '/app/roles', active: null, menuname: 'Events', icon: 'icon-drawer icon text-primary-lter'},
      {href: '/app/menus', active: null, menuname: 'Listen', icon: 'icon-list icon  text-info-dker'},
      {href: '/app/menus', active: null, menuname: 'Video', icon: 'icon-social-youtube icon  text-primary'}
    ],
    menuTree: [
      {href: null, active: 'active', menuname: '系统管理', icon: 'icon-disc icon text-success', level: 1},
      {href: '/app/users', active: null, menuname: '用户管理', icon: 'fa fa-angle-right text-xs', level: 2},
      {href: '/app/roles', active: null, menuname: '角色管理', icon: 'fa fa-angle-right text-xs', level: 2},
      {href: '/app/menus', active: null, menuname: '菜单管理', icon: 'fa fa-angle-right text-xs', level: 2}
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';

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


  constructor() {
  }

  ngOnInit() {
  }

}

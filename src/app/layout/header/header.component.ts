import { Component, OnInit } from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends MainComponent implements OnInit {
  //
  // userInfo = {
  //   username: '张三'
  // };

  ngOnInit() {
  }


  constructor(router: Router) {
    super(router);
  }

  logout() {
    console.log('退出');
    sessionStorage.removeItem('current_user');

  }
}

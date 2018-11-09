import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Properties} from '../public/properties';
import {Urls} from '../public/url';

declare var layui: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public router: Router) {
    // this.isLogin();
  }

  /**
   * 方法用途: 判断当前是否登录，已经登录直接前往首页，未登录直接前往登录页
   * 参数：无
   **/
  isLogin() {
    if (sessionStorage.getItem(Properties.SESSION.CURRENT) !== null) {
      return this.router.navigate([Urls.SESSION.APP]);
    }
    if (sessionStorage.getItem(Properties.SESSION.CURRENT) === null) {
      return this.router.navigate([Urls.SESSION.LOGIN]);
    }
  }

  ngOnInit() {
  }

}

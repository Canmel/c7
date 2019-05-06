import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Properties} from '../public/properties';
import {Urls} from '../public/url';
import * as $ from 'jquery';
import {HttpsUtils} from '../app/utils/HttpsUtils.service';

declare var layui: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userInfo = {
    username: sessionStorage.getItem(Properties.SESSION.CURRENT_NICKNAME),
    sysRoles: '未知'
  };

  constructor(public router: Router, public http: HttpsUtils) {
    // this.loadCurrentUser();
    alert(123123);
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

  /**
  * 方法用途: 滚动底部组件动作
  * 参数：
  **/
  slideFooter() {
    if ($('#content-footer').css('display') === 'none') {
      $('#content-footer').slideDown('slow');
    } else {
      $('#content-footer').slideUp('slow');
    }

  }

  ngOnInit() {
  }

  /**
  * 方法用途: 加载当前用户
  * 参数：
  **/
  loadCurrentUser() {
    const _this = this;
    this.http.get(Urls.USERS.ME).then(resp => {
      if (resp['data']) { _this.userInfo.username = '张晓文'; }
      console.log(resp['data']);
    });
  }

}

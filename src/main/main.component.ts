import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Urls} from '../public/url';
import * as $ from 'jquery';
import {HttpsUtils} from '../app/utils/HttpsUtils.service';
import {CookieService} from 'ngx-cookie-service';
import {SystemProperties} from '../app/utils/system-properties';

declare var layui: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userInfo = {
    username: 'aas',
    sysRoles: '未知'
  };

  constructor(public router: Router, public http: HttpsUtils, private cookieService: CookieService) {
    this.http.get(Urls.SESSION.USERINFO).then(resp => {
      sessionStorage.setItem('authentication', resp['principal']);
      console.log(resp);
      if (resp['principal']) {
        this.userInfo.username = resp['principal']['username'];
      }
      // this.userInfo.username = this.cookieService.get(SystemProperties.session.authenticated);
    }, error => {
      console.log(error);
    });
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
      console.log(resp);
    });
  }

}

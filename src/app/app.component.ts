import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {Urls} from '../public/url';
import {CookieService} from 'ngx-cookie-service';
import {SystemProperties} from './utils/system-properties';
import {HttpsUtils} from './utils/HttpsUtils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cookieValue = 'UNKNOWN';

  constructor(public https: HttpsUtils, private router: Router, private location: PlatformLocation, private cookieService: CookieService) {
    this.isLogin();
  }

  ngOnInit(): void {
  }

  /**`
   * 方法用途: 判断当前是否登录，已经登录直接前往首页，未登录直接前往登录页
   * 参数：无
   **/
  isLogin() {
    this.cookieValue = this.cookieService.get(SystemProperties.session.authenticated);
    console.log(this.cookieValue);
    if (this.cookieValue !== 'true') {
      this.https.get(Urls.SESSION.USERINFO, {}).then(resp => {
        this.cookieService.set(SystemProperties.session.authenticated, resp['authenticated']);
        console.log(resp);
      });
    }

    if (sessionStorage.getItem('access_token') === null || sessionStorage.getItem('access_token') === '') {
      window.location.href = '/login';
    } else {
      this.router.navigate(['/app/home']);
    }
  }
}

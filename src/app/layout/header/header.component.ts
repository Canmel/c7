import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {CookieService} from 'ngx-cookie-service';
import {Urls} from '../../../public/url';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends MainComponent implements OnInit {

  currentTasks: Array<any> = [];

  ngOnInit() {
    this.getTodos();
  }

  constructor(router: Router, http: HttpsUtils, cookies: CookieService, public notification: NzNotificationService) {
    super(router, http, cookies);
  }

  /**
   * 方法用途: 项目用户登出
   * 参数：无
   **/
  logout() {
    this.http.delete(Urls.SESSION.LOGOUT, {}).then(resp => {
      if (resp['code'] === 200) {
        this.notification.success('成功', resp['message']);
        sessionStorage.clear();
        this.router.navigate(['/unauthentication']);
      } else {
        this.notification.error('失败', resp['message']);
      }
    });
    this.clearCookie('XSRF-TOKEN');
    this.clearCookie('AUTHENTICATED');
  }

  clearCookie(name) {
    this.setCookie(name, '', -1);
  }

  setCookie(name, value, seconds) {
    seconds = seconds || 0;
    let expires = '';
    if (seconds !== 0) {
      const date = new Date();
      date.setTime(date.getTime() + (seconds * 1000));
      expires = '; expires=' + date.toDateString();
    }
    document.cookie = name + '=' + escape(value) + expires + '; path=/';
  }

  getTodos() {
    this.http.get(Urls.WORKFLOW.TODO).then(resp => {
      this.currentTasks = this.currentTasks.concat(resp['data']);
    });
  }
}

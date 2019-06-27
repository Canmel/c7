import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {CookieService} from 'ngx-cookie-service';
import {Urls} from '../../../public/url';
import {cleanSession} from 'selenium-webdriver/safari';

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

  constructor(router: Router, http: HttpsUtils, cookies: CookieService) {
    super(router, http, cookies);
  }

  /**
   * 方法用途: 项目用户登出
   * 参数：无
   **/
  logout() {
    // sessionStorage.clear();
    // sessionStorage.clear();
    // this.setCookie(name, '', -1);
    this.http.get(Urls.SESSION.LOGOUT).then(resp => {
      console.log(resp);
      // this.router.navigate(['/login']);
    });

    this.http.get(Urls.SESSION.LOGOUT2).then(resp => {
      console.log(resp);
      // this.router.navigate(['/login']);
    });
    // this.http.delete(Urls.SESSION.LOGOUT, {token: 'asdad'}).then(
    //   resp => {
    //     console.log(resp);
    //   }
    // );
    // this.router.navigate(['/login']);
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
  }

  test() {
    this.http.get('/api/workflow/test').then(resp => {
      console.log(resp);
    });
  }

  getTodos() {
    this.http.get(Urls.WORKFLOW.TODO).then(resp => {
      this.currentTasks = this.currentTasks.concat(resp['data']);
    });
  }
}

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
    this.http.get(Urls.SESSION.LOGOUT, ).then(resp => {
      console.log(resp);
      // this.router.navigate(['/login']);
    });
    // this.http.get(Urls.SESSION.LOGOUT).then(
    //   resp => {
    //     console.log(resp);
    //   }
    // );
    // this.router.navigate(['/login']);
  }

  test() {
    this.http.get('/api/workflow/test').then(resp => {
      console.log(resp);
    });
  }

  getTodos() {
    this.http.get(Urls.WORKFLOW.TODO).then(resp => {
      console.log(resp['data']);
      this.currentTasks = this.currentTasks.concat(resp['data']);
      console.log(this.currentTasks);
    });
    console.log(this.currentTasks);
  }
}

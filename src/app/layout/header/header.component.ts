import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends MainComponent implements OnInit {

  ngOnInit() {
  }

  constructor(router: Router, http: HttpsUtils, cookies: CookieService) {
    super(router, http, cookies);
  }

  /**
   * 方法用途: 项目用户登出
   * 参数：无
   **/
  logout() {
    sessionStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }

  test() {
    this.http.get('/api/workflow/test').then(resp => {
      console.log(resp);
    });
  }
}

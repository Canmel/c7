import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {Properties} from '../public/properties';
import {Urls} from '../public/url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private location: PlatformLocation) {
    this.isLogin();
  }
  ngOnInit(): void {
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
    alert(21221);
  }
}

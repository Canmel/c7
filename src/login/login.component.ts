import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Properties} from '../public/properties';
import {Router} from '@angular/router';
import {Urls} from '../public/url';

declare var particlesInit: any;   // 已经导入了   不需要再次声明， 这里是为了防止 编译报错

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) {
    this.isLogin();
  }

  ngOnInit() {
    particlesInit();  // 登陆页面动画效果
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
   * 方法用途: 登录点击事件
   * 参数：无
   **/
  login() {
    const _this = this;
    $('.login').addClass('active');
    setTimeout(function () {
      $('.sk-rotating-plane').addClass('active');
      $('.login').css('display', 'none');
    }, 800);
    setTimeout(function () {
      $('.login').removeClass('active');
      $('.sk-rotating-plane').removeClass('active');
      $('.login').css('display', 'block');
      _this.loginSuccessCallBack();
    }, 3000);
  }

  /**
   * 方法用途: 登录点击事件成功回调
   * 参数：无
   **/
  loginSuccessCallBack() {
    sessionStorage.setItem(Properties.SESSION.CURRENT, 'user');
    this.router.navigate([Urls.SESSION.APP]);
  }

  /**
   * 方法用途: 登录点击事件失败回调
   * 参数：无
   **/
  loginFaildCallBack() {
    alert('登录失败');
  }

}

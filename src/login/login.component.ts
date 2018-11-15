import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Properties} from '../public/properties';
import {Router} from '@angular/router';
import {Urls} from '../public/url';
import {HttpsUtils} from '../app/utils/HttpsUtils.service';

declare var particlesInit: any;   // 已经导入了   不需要再次声明， 这里是为了防止 编译报错

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  contentData = {rqcode: '0000', username: '', password: ''};

  constructor(public router: Router, public http: HttpsUtils) {
  }

  ngOnInit() {
    particlesInit();  // 登陆页面动画效果
    this.http.get(Urls.SESSION.QRCODE).then(resp => {
      this.contentData['qrcode'] = resp['data']['verify'];
    });
  }

  /**
   * 方法用途: 登录点击事件
   * 参数：无
   **/
  login() {
    const _this = this;
    $.ajax({
      url: '/auth/login',
      data: {
        username: $('input[name="username"]').val(),
        password: $('input[name="password"]').val(),
        imageCode: $('input[name="qrcode"]').val()
      },
      method: 'POST',
      xhrFields: {
        withCredentials: true
      },
      success: function (resp) {
        sessionStorage.setItem(Properties.STRING.SESSION.ACCESS_TOKEN, resp['access_token']);
        sessionStorage.setItem(Properties.SESSION.CURRENT_USER_NAME, resp['data']['username']);
        sessionStorage.setItem(Properties.SESSION.CURRENT_NICKNAME, resp['data']['nickname'])
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
      },
      error: function (e, s, m) {
        _this.loginFaildCallBack();
      }
    });


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

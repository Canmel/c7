import {Component, OnInit} from '@angular/core';
import {Properties} from '../../../public/properties';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  crumbs = {
    title: '用户详情'
  };

  userDetails = {
    username: sessionStorage.getItem(Properties.SESSION.CURRENT_USER_NAME),
    address: '浙江省杭州市西湖区',
    mobile: '18357162602',
    email: '892379244@qq.com',
    remark: '我爱北京天安门，天安门外很冷啊，早上早点去，晚上早点回， 晚上风大，不能一直在户外的，如果一直在户外会让人心碎，毕竟这是北京...'
  };

  userLogs = [
    {operation: '删除用户', gmtCreate: '208-10-12 09:21:22', module: '用户 张三 删除用户 "祝覅是" '}
  ];

  constructor(public http: HttpsUtils) {
  }

  ngOnInit() {
    this.loadMe();
    this.initAvtar();
  }

  initAvtar() {
    const $box = document.getElementById('pic_box');
    const $li = $box.getElementsByTagName('li');
    for (let i = 0; i < $li.length; i++) {
      console.log($li[i]);
      $($li[i]).click(function () {
        $.each($li, function (j, item) {
          $(item).css('borderRadius', '15%');
        });
        this.style.borderRadius = '50%';
      });
    }

    $('.pic_box li img').click(function () {
      const src = $(this).attr('src');
      $('.jide').val(src);
    });
  }

  loadMe() {
    const authentication = JSON.parse(sessionStorage.getItem('authentication'));
    this.userDetails = authentication['sysUser'];
  }

  picBoxClickHandler() {
    $('.pic_box').animate({
      'top': '-1000px'
    }, 500);
  }

  boxClickHandler() {
    $('.pic_box').animate({
      'top': '15px',
    }, 300);
  }

  querenClickHandler() {
    const src = $('.jide').val();

    if (src !== '') {
      $('.my_pic').attr('src', src.toString());
      $('.pic_box').animate({
        'top': '-1000px'
      }, 500);
      const user = JSON.parse(sessionStorage.getItem('sysUser'));
      user['avatar'] = src.toString();

      sessionStorage.setItem('sysUser', JSON.stringify(user));
      this.http.post('system/sysUser/avatar', {avatar: src}).then(resp => {
        console.log(resp);
      });
    } else {
      return false;
    }
  }

  userAvatar() {
    const user = JSON.parse(sessionStorage.getItem('sysUser'));
    if (user && user['avatar']) {
      return user['avatar'];
    }
    return 'assets/img/avatar/1.png';
  }

}

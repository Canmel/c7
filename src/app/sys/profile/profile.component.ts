import {Component, OnInit} from '@angular/core';
import {Properties} from '../../../public/properties';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import * as $ from 'jquery';
import {NzNotificationService} from 'ng-zorro-antd';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  crumbs = {
    title: '用户详情'
  };

  imageIndex = [];

  avatarImage = '';

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

  constructor(public http: HttpsUtils, public notification: NzNotificationService) {
  }

  ngOnInit() {
    this.initImageIndex();
    this.loadMe();
  }

  initImageIndex() {
    for ( let i = 1; i <= 48; i++) {
      this.imageIndex.push(i);
    }
    console.log(this.imageIndex);
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
    if (this.avatarImage !== '') {
      $('.pic_box').animate({
        'top': '-1000px'
      }, 500);
      const user = JSON.parse(sessionStorage.getItem('sysUser'));
      user['avatar'] = this.avatarImage;

      sessionStorage.setItem('sysUser', JSON.stringify(user));
      this.http.put('system/sysUser', {uid: user['uid'], avatar: this.avatarImage}).then(resp => {
        this.notification.success('成功', resp['msg']);
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

  imageClick($event) {
    console.log($event);
    const $box = document.getElementById('pic_box');
    const $li = $box.getElementsByTagName('li');
    for (let i = 0; i < $li.length; i++) {
      $($li[i]).css('borderRadius', '15%');
    }
    this.avatarImage = $($event.srcElement).attr('src');
    $($event.srcElement).parents('li').css('borderRadius', '50%');
  }

}

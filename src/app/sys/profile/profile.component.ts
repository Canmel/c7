import {Component, OnInit} from '@angular/core';
import {Properties} from '../../../public/properties';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

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
  }

  loadMe() {
    const authentication = JSON.parse(sessionStorage.getItem('authentication'));
    this.userDetails = authentication['sysUser'];
  }

}

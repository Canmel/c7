import {Component, OnInit} from '@angular/core';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {NzNotificationService} from 'ng-zorro-antd';
import {Properties} from '../../../public/properties';
import {_i18n} from '../../../public/i18n/i18n';

@Component({
  selector: 'app-lefter',
  templateUrl: './lefter.component.html',
  styleUrls: ['./lefter.component.css']
})
export class LefterComponent implements OnInit {

  menusData = {
    menuList: [
      {address: '/app/home', active: 'active', menuname: '首页', icon: 'icon-disc icon text-success'},
      {address: '/app/users', active: null, menuname: 'Genres', icon: 'icon-music-tone-alt icon text-info'},
      {address: '/app/roles', active: null, menuname: 'Events', icon: 'icon-drawer icon text-primary-lter'},
      {address: '/app/menus', active: null, menuname: 'Listen', icon: 'icon-list icon  text-info-dker'},
      {address: '/app/menus', active: null, menuname: 'Video', icon: 'icon-social-youtube icon  text-primary'}
    ],
    menuTree: []
  };

  constructor(private http: HttpsUtils, public notificationService: NzNotificationService) {
    const _this = this;
    this.http.get(Urls.MENUS.TOPMENUS).then(resp => {
      console.log(resp)
      $.each(resp['data'], function (index, item) {
        _this.menusData.menuTree.push(item);
      });
    }, resp => {
      console.log(resp);
      this.notificationService.error(_i18n.TOOLS.NOTIFICATION.ERROR, resp['msg']);
    });
    this.http.get(Urls.MENUS.SUBS).then(resp => {
      $.each(resp['data'], function (index, item) {
        _this.menusData.menuTree.push(item);
      });
    }, resp => {
      if ( resp.indexOf(Properties.STRING.SYSTEM.PROXY_ERROR) > -1) {
        this.notificationService.error(_i18n.TOOLS.NOTIFICATION.ERROR, _i18n.NET.PROXY_ERROR);
      } else {
        this.notificationService.error(_i18n.TOOLS.NOTIFICATION.ERROR, resp['msg']);
      }
    });
  }

  ngOnInit() {
    // this.todos();
  }

  todos () {
    this.http.get(Urls.WORKFLOW.TODO).then(
      resp => {
        console.log(resp);
      },
      resp => {
        console.log(resp);
      }
    );
  }
}

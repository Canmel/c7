import {Component, OnInit} from '@angular/core';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

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

  constructor(private http: HttpsUtils) {
    var _this = this;
    this.http.get(Urls.MENUS.TOPMENUS).then(resp => {
      $.each(resp['data'], function (index, item) {
        _this.menusData.menuTree.push(item);
      });
    }, resp => {
      alert('获取一级目录失败');
    });
    this.http.get(Urls.MENUS.SUBS).then(resp => {
      $.each(resp['data'], function (index, item) {
        _this.menusData.menuTree.push(item);
      });
    }, resp => {
      alert('获取二级目录失败');
    });
  }

  ngOnInit() {
  }

}

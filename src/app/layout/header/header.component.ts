import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../../../main/main.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends MainComponent implements OnInit {

  ngOnInit() {
  }

  constructor(router: Router) {
    super(router);
  }

  /**
   * 方法用途: 项目用户登出
   * 参数：无
   **/
  logout() {
    console.log('退出');
    sessionStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }
}

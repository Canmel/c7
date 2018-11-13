import {Directive} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';

@Directive({
  selector: '[appList]'
})

/**
 * 类用途: 模块的公用列表
 **/
export class ListDirective {

  constructor(public router: Router, public modalService: NzModalService, public hc: HttpClient) {
  }

  /**
   * 方法用途: 父子组件通讯方法用来接收子组件（用户列表listComponent）发出的事件
   * 参数：event: 事件
   **/
  priceQuoteHandler(event: any) {
    if (event.data && event.data.url) {
      this.router.navigate([event.data.url]);
    }
    if (event.data && event.data.cback) {
      event.data.cback(event.index, event.row, this.modalService, this.hc);
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  // 父控件传递参数给子控件 直接通过 Input
  @Input() totalNum;
  @Input() pageSize; // 每页数据条数
  // @Input() totalPage; // 总页数
  @Input() curPage; // 当前页码;

  // 子控件传递给父控件 通过事件传播
  @Output() changeCurPage: EventEmitter<Number> = new EventEmitter;
  totalPage = Math.ceil(this.totalNum / this.pageSize);
  /**
   * 方法用途: 改变页码回调参数
   * 参数：pageNo 页码
   **/
  changePage(pageNo) {
    this.curPage = pageNo;
    console.log(this.curPage, pageNo);
    this.changeCurPage.emit(this.curPage);
  }

  constructor() {
  }

  ngOnInit() {
    this.totalPage = Math.ceil(this.totalNum / this.pageSize);
  }

}

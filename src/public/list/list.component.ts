import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() listHead: Array;
  @Input() listBody: Array;
  @Input() indexNum: number;
  @Output() optinEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 方法用途: 列表点击事件发射事件至父组件
   * 参数：url: 即将发射的参数
   **/
  optionClickEvent(data, index, item) {
    if (data.cback) {
      data.cback(index, item);
    }
    this.optinEvent.emit(data);
  }

}

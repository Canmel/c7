import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() listHead: Array<any>;
  @Input() listBody: Array<any>;
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
    this.optinEvent.emit({data: data, index: index, row: item});
  }

}

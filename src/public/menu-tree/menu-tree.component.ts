import {Component, Input, OnInit} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.css']
})
export class MenuTreeComponent implements OnInit {

  @Input() menuList: Array<any>;
  @Input() menuTree: Array<any>;

  constructor() {

  }

  ngOnInit() {
  }

  level1() {
    const result = [];
    const _this = this;
    $.each(this.menuTree, function (i, item) {
      if (item.type === 0) {
        if (_this.hasChild(item)) {
          result.push(item);
        }
      }
    });
    return result;
  }

  level2(id) {
    const result = [];
    $.each(this.menuTree, function (i, item) {
      if (item.type === 1 && id === item.parentId) {
        result.push(item);
      }
    });
    return result;
  }

  hasChild(item) {
    let flag = false;
    $.each(this.menuTree, function (index, obj) {
      if (obj.parentId === item.menuId) {
        flag = true;
      }

    });
    return flag;
  }

}

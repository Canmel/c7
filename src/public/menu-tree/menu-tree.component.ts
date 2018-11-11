import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.css']
})
export class MenuTreeComponent implements OnInit {

  @Input() menuList: Array;
  @Input() menuTree: Array;

  constructor() {
  }

  ngOnInit() {
  }

}

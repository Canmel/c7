import { Component, OnInit } from '@angular/core';
import {_i18n} from '../../../public/i18n/i18n';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.css']
})
export class MacrosComponent implements OnInit {

  _i18n = _i18n;

  crumbs = {
    title: '通用字典',
    subTitle: '字典列表'
  };

  constructor() { }

  ngOnInit() {
  }

}

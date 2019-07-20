import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  crumbs: any = {
    title: null,
    subTitle: null
  };

  printCSS: string[];
  printStyle: string;
  printBtnBoolean = true;

  constructor() {
  }

  ngOnInit() {
    this.loadPrintStyle();
  }

  printComplete() {
    this.printBtnBoolean = true;
  }

  beforePrint() {
    this.printBtnBoolean = false;
  }

  loadPrintStyle() {
    this.printCSS = ['/assets/css/ng-zorro-antd.min.css'];
    this.printStyle =
      `td {
        border: 1px solid black;
      }
      .etable {
        width: 100%;
      }`;
  }

}

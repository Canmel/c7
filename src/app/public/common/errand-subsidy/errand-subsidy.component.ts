import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-errand-subsidy',
  templateUrl: './errand-subsidy.component.html',
  styleUrls: ['./errand-subsidy.component.css']
})
export class ErrandSubsidyComponent implements OnInit {

  @Input() selected;

  printCSS: string[];
  printStyle: string;
  printBtnBoolean = true;

  constructor() {
    this.loadPrintStyle();
  }

  ngOnInit() {
  }

  printComplete() {
    this.printBtnBoolean = true;
  }

  beforePrint() {
    this.printBtnBoolean = false;
  }

  loadPrintStyle() {
    this.printCSS = ['http://127.0.0.1:4200/assets/css/ng-zorro-antd.min.css'];
    this.printStyle = `
          .etable tr td {
          border: 1px solid black;
            }
            .etable th {
              border: 1px solid black;
            }
            .etable {
              width: 100%;
              text-align: center;
              font-size: 12px;
            }`;
  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-errand-doc',
  templateUrl: './errand-doc.component.html',
  styleUrls: ['./errand-doc.component.css']
})
export class ErrandDocComponent implements OnInit {

  @Input() selected;

  printCSS: string[];
  printStyle: string;
  printBtnBoolean = true;

  constructor() {
    this.loadPrintStyle();
  }

  ngOnInit() {
  }

  handlePrint(oper) {
    if (oper < 10) {
      const bdhtml = window.document.body.innerHTML;
      const sprnstr = '<!--startprint' + oper + '-->';
      const eprnstr = '<!--endprint' + oper + '-->';
      let prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18);
      prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
      window.document.body.innerHTML = prnhtml;
      window.print();
      window.document.body.innerHTML = bdhtml;
    } else {
      window.print();
    }
  }

  printComplete() {
    this.printBtnBoolean = true;
  }

  beforePrint() {
    this.printBtnBoolean = false;
  }

  loadPrintStyle() {
    this.printCSS = ['http://127.0.0.1:4200/assets/css/ng-zorro-antd.min.css'];
    this.printStyle =
      `td {
  border: 1px solid black;

}
.etable {
  width: 100%;
}
     `;
  }
}

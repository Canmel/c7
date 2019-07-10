import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-errand',
  templateUrl: './errand.component.html',
  styleUrls: ['./errand.component.css']
})
export class ErrandComponent implements OnInit {

  crumbs = {
    title: '日常管理',
    subTitle: '出差管理'
  };

  listHeader = [
    {title: '编号', field: 'eno', type: 'click', class: 'text-success'},
    {title: '出差人员', field: 'username', type: 'text'},
    {title: '目的地', field: 'target', type: 'text'},
    {title: '差期', field: 'dateRange', type: 'text'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  errands: Array<any> = [];

  selected: any = null;

  isVisible = false;

  printCSS: string[];
  printStyle: string;
  printBtnBoolean = true;

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: 21,
    pageSize: 10,
    currentPage: 1,
    name: ''
  };

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
    this.loadPrintStyle();
  }

  ngOnInit() {
    this.loadEntities();
  }

  /**
   * 方法用途: 加载列表信息
   * 参数：
   **/
  loadEntities() {
    this.https.get(Urls.ERRAND.PAGEQUERY, this.formData).then(resp => {
      this.errands = resp['data']['list'];
      this.formData.pageNum = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
    });
  }

  showModal() {
    alert('弹窗');
  }

  showExamModal() {
    alert('弹窗');
  }

  remove() {
    alert('弹窗');
  }

  edit() {
    alert('前往编辑');
  }

  noProcess(item) {
    console.log(item);
  }

  isProcessing(errand: any) {
    return !(this.errands['status'] !== 0);
  }


  details(v): void {
    this.selected = v;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
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
      `
      .show-details > span {
  margin-left: 20px;
}

.show-details {
  display: inline-block;
  margin-top: 20px;
  width: 33%;
}

.comment-title {
  font-size: 16px;
}

.comment-content {
  background-color: darkseagreen;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.error_message {
  color: red;
}

.elogo {
  text-align: center;
}

.ehead {
  text-align: left;
  margin: 0px;
  color: black;
}

.elabel {
  text-align: center;
  color: black;
  font-weight: bold;
}

.e2 {
  min-height: 150px;
  line-height: 151px;
}

.evalue {
  padding: 0px;
}

.evalue > input {
  width: 100%;
  height: 55px;
  text-align: center;
}

nz-select > div {
  width: 100%;
  height: 55px;
  text-align: center;
}

.ant-table-bordered .ant-table-tbody>tr>td, .ant-table-bordered .ant-table-thead>tr>th {
  border: 2px solid black;
}

.ant-select-selection--single {
  height: 55px;
  position: relative;
}

tr:hover{
  background-color: unset;
}

::selection {

}

.error_message {
  color: red;
}

.ant-table-placeholder{
  display: none;
}

nz-date-picker {
  margin: 0 8px 12px 0;
}


     }
     `;
  }

}

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
    return ! (this.errands['status'] !== 0);
  }


  details(v): void {
    this.selected = v;
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

}

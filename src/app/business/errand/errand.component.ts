import {Component, OnInit} from '@angular/core';

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
    {title: '编号', field: 'eno', type: 'text', class: 'text-success'},
    {title: '出差人员', field: 'username', type: 'text'},
    {title: '目的地', field: 'target', type: 'text'},
    {title: '差期', field: 'dateRange', type: 'text'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  errands: Array<any> = [];

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

  constructor() {
  }

  ngOnInit() {
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

  noProcess() {
    alert('不在流程');
  }

}

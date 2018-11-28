import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent implements OnInit {

  crumbs = {
    title: '流程管理',
    subTitle: '工作流'
  };

  urls = Urls;

  formData: any = {
    totalNum: 21,
    pageSize: 10,
    currentPage: 1,
    menuname: ''
  };

  listHeader = [];

  deployedListHeader = [
    {title: '流程ID', field: 'id', type: 'text'},
    {title: '流程名称', field: 'name', type: 'text', class: 'text-success'},
    {title: '发布时间', field: 'deploymentTime', type: 'timeStamp'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  entities: Array<any> = [];

  deployedEntities: Array<any> = [];

  public workFlowTypies = [];

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
    this.initWorkFlowType();
  }

  ngOnInit() {
    this.loadEntities();
    this.loadDeployedEntities();
  }

  /**
   * 方法用途: 加载列表信息
   * 参数：
   **/
  loadEntities() {
    this.https.get(Urls.WORKFLOW.PAGEQUERY, this.formData).then(resp => {
      this.entities = resp['data']['records'];
      this.formData.currentPage = resp['data']['current'];
      this.formData.totalNum = resp['data']['total'];
    }, resp => {
      console.log(resp);
    });
  }

  /**
   * 方法用途: 加载已发布流程信息
   * 参数：
   **/
  loadDeployedEntities() {
    this.https.get(Urls.WORKFLOW.DEPLOYEDPAGEQUERY, this.formData).then(resp => {
      this.deployedEntities = resp['data']['records'];
      this.formData.currentPage = resp['data']['current'];
      this.formData.totalNum = resp['data']['total'];
    }, resp => {
      console.log(resp);
    });
  }

  formateDate(timeStamp) {
    const d = new Date(timeStamp);
    return (d.getFullYear()) + '-' + (d.getMonth() + 1) + '-' + (d.getDate()) + ' '
      + (d.getHours()) + ':' + (d.getMinutes()) + ':' + (d.getSeconds());
  }

  initWorkFlowType() {
    this.https.get(Urls.OPTIONS.WORKFLOW.TYPES).then(resp => {
      this.workFlowTypies = resp['data'];
      this.listHeader = [{title: '流程ID', field: 'id', type: 'text'},
        {title: '流程名称', field: 'name', type: 'text', class: 'text-success'},
        {title: '类型', field: 'flowType', type: 'enum', options: this.workFlowTypies},
        {title: '操作', field: 'option', type: 'opt', width: '20%'}];
    });
  }

  edit(param){
    this.router.navigate([Urls.BUSINESS.WORKFLOW.EDIT], {queryParams: param});
  }
}

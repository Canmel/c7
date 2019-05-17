import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent implements OnInit {

  /** 属性用途: 面包屑菜单路径 **/
  crumbs = {
    title: '流程管理',
    subTitle: '工作流'
  };

  /** 属性用途: 页面引用URL信息 **/
  urls = Urls;

  /** 属性用途: 页面参数 分页级查询条件 **/
  formData: any = {
    totalNum: 21,
    pageSize: 10,
    currentPage: 1,
    menuname: ''
  };

  /** 属性用途: 页面参数 分页级查询条件 **/
  deployedFormData: any = {
    totalNum: 21,
    pageSize: 10,
    currentPage: 1,
    menuname: ''
  };

  /** 属性用途: 未发布流程 表头 **/
  listHeader = [];

  /** 属性用途: 已发布的流程 表头 **/
  deployedListHeader = [];

  /** 属性用途: 未发布的流程 接收实体类 **/
  entities: Array<any> = [];

  /** 属性用途: 已发布流程 接收实体类 **/
  deployedEntities: Array<any> = [];

  /** 属性用途: 工作流类型集合 **/
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
    const entityParams = {isPublic: 0};
    this.https.get(Urls.WORKFLOW.PAGEQUERY, $.extend(entityParams, this.formData)).then(resp => {
      this.entities = resp['data']['list'];
      this.formData.curPage = resp['data']['pageNum'];
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
    console.log(this.deployedFormData.currentPage);
    this.https.get(Urls.DEPLOYEDWORKFLOW.PAGEQUERY, this.deployedFormData).then(resp => {
      console.log(resp);
      this.deployedEntities = resp['data']['list'];
      this.deployedFormData.currentPage = resp['data']['pageNum'];
      this.deployedFormData.totalNum = resp['data']['total'];
    }, resp => {
      console.log(resp);
    });
  }

  /**
   * 方法用途: 页面工具方法 格式化时间   年月日 时分秒
   * 参数:
   **/
  formateDate(timeStamp) {
    const d = new Date(timeStamp);
    return (d.getFullYear()) + '-' + (d.getMonth() + 1) + '-' + (d.getDate()) + ' '
      + (d.getHours()) + ':' + (d.getMinutes()) + ':' + (d.getSeconds());
  }

  /**
   * 方法用途: 获取工作流类型 并初始化
   * 参数:
   **/
  initWorkFlowType() {
    this.https.get(Urls.OPTIONS.WORKFLOW.TYPES).then(resp => {
      this.workFlowTypies = resp['data'];
      this.listHeader = [{title: '流程ID', field: 'id', type: 'text'},
        {title: '流程名称', field: 'name', type: 'text', class: 'text-success'},
        {title: '类型', field: 'flowType', type: 'enum', options: this.workFlowTypies},
        {title: '操作', field: 'option', type: 'opt', width: '20%'}];
      this.deployedListHeader = [
        {title: '流程ID', field: 'id', type: 'text'},
        {title: '流程名称', field: 'name', type: 'text', class: 'text-success'},
        // {title: '类型', field: 'flowType', type: 'enum', options: this.workFlowTypies},
        {title: '发布时间', field: 'deploymentTime', type: 'timeStamp'},
        {title: '操作', field: 'option', type: 'opt', width: '20%'}];
    });
  }

  /**
   * 方法用途: 编辑跳转页面 传递参数
   * 参数:
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.WORKFLOW.EDIT], {queryParams: param});
  }


  /**
   * 方法用途: 发布流程点击事件回调
   * 参数:
   **/
  publish(item) {
    this.modalService.confirm({
      nzTitle: '你确定要发布 ' + item.name + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => this.publishOkHandler(item),
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  /**
   * 方法用途: 发布流程确定回调
   * 参数:
   **/
  publishOkHandler(item) {
    this.https.get(Urls.WORKFLOW.PUBLISH + item.id).then(resp => {
      if (resp['code'] === 200) {
        this.loadEntities();
        this.loadDeployedEntities();
        this.notification.success('成功', resp['msg']);
      } else {
        this.notification.error('失败', resp['msg']);
      }
    }, resp => {
      console.log(resp);
    });
  }

  /**
   * 方法用途: 删除
   * 参数：
   **/
  removeDeployed(item) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + item['name'] + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => this.removeDeployedOkHandler(item['id']),
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  /**
   * 方法用途: 删除流程部署 ok 回调
   * 参数:
   **/
  removeDeployedOkHandler(id) {
    this.https.delete(Urls.DEPLOYEDWORKFLOW.DELETE, id).then(
      resp => {
        console.log(resp);
        if (resp['httpStatus'] === 200) {
          this.notification.success('成功', resp['msg']);
        } else {
          this.notification.error('失败', resp['msg']);
        }
        this.loadDeployedEntities();
      }, resp => {
        console.log(resp);
      }
    );
  }
}

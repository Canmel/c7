import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {Properties} from '../../../public/properties';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit {
  crumbs = {
    title: '财务管理',
    subTitle: '财务管理'
  };

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

  /**
   * 属性描述: 模态框显示状态
   * 参数：
   **/
  isVisible = false;

  /**
   * 属性描述: 流程显示状态
   * 参数：
   **/
  isVisibleFlow = false;

  isVisibleExam = false;

  selectedValue;

  selectTask;

  selectItem = {
    name: '',
    amount: 0,
    description: ''
  };

  commitForm = {
    commontValue: ''
  };


  /**
   * 表头
   */
  listHeader = [
    {title: '名称', field: 'name', type: 'text', class: 'text-success'},
    {title: '描述', field: 'description', type: 'text'},
    {title: '状态', field: 'status', type: 'text'},
    {title: '流程', field: 'task.name', type: 'union', clickFn: this.clickFnFlow, class: 'text-success'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  reimbursements: Array<any> = [];

  deployedProcess: Array<any> = [];

  selectedItemId;

  taskImageUrl = '';

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
  }

  ngOnInit() {
    this.loadEntities();
    this.loadDepolyedProcess();
  }

  loadComments(){

  }

  loadDepolyedProcess() {
    this.https.get(Urls.WORKFLOW.DEPLOYED, {flowType: 3}).then(resp => {
      this.deployedProcess = resp['data'];
    });
  }

  /**
   * 方法用途: 加载列表信息
   * 参数：
   **/
  loadEntities() {
    this.https.get(Urls.REIMBURSEMENT.PAGEQUERY, this.formData).then(resp => {
      this.reimbursements = resp['data']['records'];
      this.formData.currentPage = resp['data']['current'];
      this.formData.totalNum = resp['data']['total'];
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.REIMBURSEMENT.EDIT], {queryParams: param});
  }

  /**
   * 方法用途: 删除
   * 参数：
   **/
  remove(param, name) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + name + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        const _this = this;
        this.https.delete(Urls.REIMBURSEMENT.DELETE, param['id']).then(resp => {
          if (resp['httpStatus'] === 200) {
            _this.notification.success('成功', resp['msg']);
          } else {
            _this.notification.error('失败', resp['msg']);
          }
          _this.loadEntities();
        }, resp => {
          console.log(resp);
        });
      },
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  /**
   * 方法用途: 发起申请
   * 参数：
   **/
  apply(param, name) {
    this.modalService.confirm({
      nzTitle: '你确定要发起申请 ' + name + '?',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => this.applyOkHandler(param),
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  /**
   * 方法用途: 申请OK回调
   * 参数:
   **/
  applyOkHandler(param) {
    this.https.get(Urls.REIMBURSEMENT.APPLY + param['id']).then(resp => {
      this.notification.success('成功', resp['msg']);
    });
  }

  /**
   * 方法用途: 模态框取消回调
   * 参数：
   **/
  handleCancel() {
    console.log(12);
    this.isVisible = false;
  }

  /**
   * 方法用途: 模态框取消回调
   * 参数：
   **/
  handleExamCancel() {
    // TODO 审核 驳回 通过回调 只是做出打印，未实际操作
    console.log('审核 驳回');
    this.isVisibleExam = false;
  }

  /**
   * 方法用途: 模态框取消回调
   * 参数：
   **/
  handleFlowCancel() {
    this.isVisibleFlow = false;
  }

  /**
   * 方法用途: 模态框确认回调
   * 参数：
   **/
  handleOk() {
    console.log(1);
    this.https.get(Urls.REIMBURSEMENT.APPLY + this.selectedItemId, {flowId: this.selectedValue}).then(
      resp => {
        if (resp['httpStatus'] === 200) {
          this.notification.success('成功', resp['msg']);
        } else {
          this.notification.error('失败', resp['msg']);
        }
      },
      resp => {
      }
    );
    this.isVisible = false;
    this.loadEntities();
  }


  /**
   * 方法用途: 模态框确认回调
   * 参数：
   **/
  handleFlowOk() {
    this.https.get(Urls.REIMBURSEMENT.APPLY + this.selectedItemId, {flowId: this.selectedValue}).then(
      resp => {
        if (resp['httpStatus'] === 200) {
          this.notification.success('成功', resp['msg']);
        } else {
          this.notification.error('失败', resp['msg']);
        }
      },
      resp => {
      }
    );


    this.isVisibleFlow = false;
  }

  /**
   * 方法用途: 审核模态框确认回调
   * 参数：
   **/
  handleExamOk() {
    if (!this.selectItem['task'] && !this.selectItem['task']['id']) {
      return this.notification.error('失败', '未找到任务信息');
    }
    this.https.get(Urls.WORKFLOW.TASKPASS + this.selectItem['task']['id'], {comment: this.commitForm.commontValue}).then(
      resp => {
        if (resp['httpStatus'] === 200) {
          this.notification.success('成功', resp['msg']);
          this.isVisibleExam = false;
        } else {
          this.notification.error('失败', resp['msg']);
        }
        this.loadEntities();
      },
      resp => {}
    );
  }

  /**
   * 方法用途: 显示模态框
   * 参数：
   **/
  showModal(id): void {
    this.selectedItemId = id;
    this.isVisible = true;
  }

  /**
   * 方法用途: 显示审核模态框
   * 参数：
   **/
  showExamModal(item): void {
    this.selectItem = item;
    this.selectedItemId = item['id'];
    this.isVisibleExam = true;
    if (item['task']) {
      this.taskImageUrl = Urls.WORKFLOW.TASKIMAGE + item['task']['id'] + '?access_token=' +
        sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    }

    if (item['task']) {
      this.https.get(Urls.WORKFLOW.COMMENTS, {id: this.selectItem['task']['id']}).then(resp => {
        console.log(resp);
      }, resp => {

      })
    }

  }


  unionHead(item, head) {
    const h = head.field.split('.');
    if (item[h[0]]) {
      return item[h[0]][h[1]];
    }
    return '';
  }


  clickFnFlow(item): void {
    if (item['task']) {
      this.taskImageUrl = Urls.WORKFLOW.TASKIMAGE + item['task']['id'] + '?access_token=' +
        sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN);
    }
    this.isVisibleFlow = true;
  }
}

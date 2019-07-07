import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {Properties} from '../../../public/properties';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit {
  crumbs = {
    title: '财务管理',
    subTitle: '报销管理'
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

  deployedProcess = [];

  selectTask;

  showTasks;

  selectItem = {
    name: '',
    amount: 0,
    description: '',
    task: null
  };

  commitForm = {
    commontValue: ''
  };


  /**
   * 表头
   */
  listHeader = [];

  reimbursements: Array<any> = [];

  // reimburesementStatus: Array<any> = [];

  selectedItemId;

  taskImageUrl = '';

  comments = [
    {taskName: '', message: '', username: '', createdTime: '', pass: true}
  ];

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
    this.loadEntityStatus();
  }

  ngOnInit() {
    this.loadEntities();
    this.loadDepolyedProcess();
  }

  loadEntityStatus() {
    this.https.get(Urls.OPTIONS.REIMBURSEMENT.STATUS).then(resp => {
      this.listHeader = [
        {title: '名称', field: 'name', type: 'text'},
        {title: '描述', field: 'description', type: 'text'},
        {
          title: '状态',
          field: 'status',
          type: 'enum',
          options: resp['data'],
          clickFn: this.clickFnFlow,
          class: 'text-success',
          cursor: 'pointer'
        },
        // {title: '流程', field: 'processStatus', type: 'union', clickFn: this.clickFnFlow, class: 'text-success', cursor: 'pointer'},
        {title: '操作', field: 'option', type: 'opt', width: '20%'}
      ];
    });
  }

  loadDepolyedProcess() {
    this.https.get(Urls.WORKFLOW.DEPLOYED, {flowType: 3, key: 'REIMBURSEMENT'}).then(resp => {
      this.deployedProcess = resp['data'];
    });
  }

  /**
   * 方法用途: 加载列表信息
   * 参数：
   **/
  loadEntities() {
    console.log(this.formData);
    this.https.get(Urls.REIMBURSEMENT.PAGEQUERY, this.formData).then(resp => {
      this.reimbursements = resp['data']['list'];
      this.formData.pageNum = resp['data']['pageNum'];
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
          if (resp['code'] === 200) {
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
      this.loadEntities();
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
    if (!this.selectItem['task'] && !this.selectItem['task']['id']) {
      return this.notification.error('失败', '未找到任务信息');
    }
    this.https.get(Urls.REIMBURSEMENT.TASKBACK + this.selectItem['task']['id'], {
      comment: this.commitForm.commontValue,
      businessId: this.selectItem['id']
    }).then(
      resp => {
        if (resp['code'] === 200) {
          this.notification.success('成功', resp['msg']);
          this.isVisibleExam = false;
        } else {
          this.notification.error('失败', resp['msg']);
        }
        this.loadEntities();
      },
      resp => {
      }
    );
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
   * 方法用途: 审核关闭回调
   * 参数：
   **/
  handleExamClose() {
    this.isVisibleExam = false;
  }

  permissions(reimbursement) {
    return true;
  }

  /**Assignable
   * 方法用途: 是否显示审核按钮
   * 参数：
   **/
  isProcessing(reimbursement) {
    const flag = reimbursement['status'] === 2 && this.permissions(reimbursement);
    return flag;
  }


  noProcess(reimbursement) {
    const flag = reimbursement['status'] === 1 && this.permissions(reimbursement);
    return flag;
  }

  /**
   * 方法用途: 模态框确认回调
   * 参数：
   **/
  handleOk() {
    this.https.get(Urls.REIMBURSEMENT.APPLY + this.selectedItemId, {flowId: this.selectedValue}).then(
      resp => {
        if (resp['code'] === 200) {
          this.notification.success('成功', resp['msg']);
          this.loadEntities();
        } else {
          this.notification.error('失败', resp['msg']);
        }
      },
      resp => {
      }
    );
    this.isVisible = false;
  }


  /**
   * 方法用途: 模态框确认回调
   * 参数：
   **/
  handleFlowOk() {
    this.https.get(Urls.REIMBURSEMENT.APPLY + this.selectedItemId, {flowId: this.selectedValue}).then(
      resp => {
        if (resp['code'] === 200) {
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
    console.log(this.selectItem['id']);
    if (!this.selectItem['id']) {
      return this.notification.error('失败', '未找到任务信息');
    }
    this.https.get(Urls.REIMBURSEMENT.TASKPASS + this.selectItem['id'], {
      comment: this.commitForm.commontValue,
      businessId: this.selectItem['id']
    }).then(
      resp => {
        if (resp['code'] === 200) {
          this.notification.success('成功', resp['msg']);
          this.isVisibleExam = false;
        } else {
          this.notification.error('失败', resp['msg']);
        }
        this.loadEntities();
      },
      resp => {
      }
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

  current(item) {
    this.selectItem = item;
    this.selectedItemId = item['id'];
    this.isVisibleExam = true;
    this.https.get(Urls.REIMBURSEMENT.CURRENT + item['id'], {flowId: 'REIMBURSEMENT:6:27504'}).then(resp => {
      console.log(resp);
      const respData = resp['data'];
      this.taskImageUrl = Urls.WORKFLOW.TASKIMAGE + respData[0]['id'];
    });
  }

  /**
   * 方法用途: 显示审核模态框
   * 参数：
   **/
  showExamModal(item): void {
    this.selectItem = item;
    const _this = this;
    _this.comments = [];
    this.taskImageUrl = '';
    this.https.get(Urls.REIMBURSEMENT.CURRENT + item['id'], {flowId: 'REIMBURSEMENT:6:27504'}).then(resp => {
      const respData = resp['data'];
      if (respData) {
        this.taskImageUrl = Urls.WORKFLOW.TASKIMAGE + respData[0]['id'] + '?access_token=' + sessionStorage.getItem('access_token');
        this.selectItem.task = respData[0];
        if (item['status'] !== 1) {
          this.https.get(Urls.WORKFLOW.COMMENTS + this.selectItem['task']['id']).then(r => {
            this.selectTask = r['data'];
            $.each(this.selectTask, function (index, task) {
              $.each(task['comment'], function (i, c) {
                _this.comments.push(
                  {taskName: task['name'], message: c['fullMessage'], username: c['userId'], createdTime: c['time'], pass: task['pass']}
                );
              });
            });
            console.log(_this.selectTask);
          });
        }
      }
    });
    this.isVisibleExam = true;
  }


  unionHead(item, head) {
    const h = head.field.split('.');
    if (item[h[0]]) {
      return item[h[0]][h[1]];
    }
    return '';
  }


  clickFnFlow(item): void {
    this.selectItem = item;
    const _this = this;
    _this.comments = [];
    this.taskImageUrl = '';
    console.log(123123);
    this.https.get(Urls.REIMBURSEMENT.CURRENT + item['id'], {flowId: 'REIMBURSEMENT:6:27504'}).then(resp => {
      const respData = resp['data'];
      if (respData) {
        this.taskImageUrl = Urls.WORKFLOW.TASKIMAGE + respData[0]['id'] + '?access_token=' + sessionStorage.getItem('access_token');
        this.selectItem.task = respData[0];

        if (item['status'] !== 1) {
          this.https.get(Urls.WORKFLOW.COMMENTS + this.selectItem['task']['id']).then(r => {
            this.selectTask = r['data'];
            $.each(this.selectTask, function (index, task) {
              $.each(task['comment'], function (i, c) {
                _this.comments.push(
                  {taskName: task['name'], message: c['fullMessage'], username: c['userId'], createdTime: c['time'], pass: task['pass']}
                );
              });
            });
            console.log(_this.selectTask);
          });
        }
      }
    });
    this.isVisibleFlow = true;
    this.loadEntities();
  }

  getComments(item) {
    const _this = this;
    if (item['status'] !== 1) {
      this.https.get(Urls.WORKFLOW.COMMENTS + this.selectItem['task']['id']).then(resp => {
        this.selectTask = resp['data'];
        _this.comments = [];
        $.each(this.selectTask, function (index, task) {
          $.each(task['comment'], function (i, c) {
            _this.comments.push({
              taskName: task['name'],
              message: c['message'],
              username: 'asda',
              createdTime: c['time'],
              pass: task['pass']
            });
          });
        });
      }, resp => {

      });
    }
  }
}

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

  listHeader: Array<any>;

  errands: Array<any> = [];

  selected: any = null;

  /**
   * 属性描述: 流程显示状态
   * 参数：
   **/
  isVisibleFlow = false;

  selectTask;

  isVisibleApply = false;

  selectItem = {
    name: '',
    amount: 0,
    description: '',
    task: null
  };

  selectedValue;
  deployedProcess = [];

  selectedItemId;
  taskImageUrl = '';
  comments = [
    {taskName: '', message: '', username: '', createdTime: '', pass: true}
  ];

  isVisible = false;
  isVisibleExam = false;

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

  commitForm = {
    commontValue: ''
  };

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
    this.loadPrintStyle();
  }

  ngOnInit() {
    this.loadEntityStatus();
    this.loadEntities();
    this.loadDepolyedProcess();
  }

  clickFnFlow(item): void {
    this.selectItem = item;
    const _this = this;
    _this.comments = [];
    this.taskImageUrl = '';
    console.log(123123);
    this.https.get(Urls.ERRAND.CURRENT + item['id'], {}).then(resp => {
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

  loadEntityStatus() {
    this.https.get(Urls.OPTIONS.ERRAND.STATUS).then(resp => {
      this.listHeader = [
        {title: '编号', field: 'eno', type: 'click', class: 'text-success'},
        {title: '出差人员', field: 'username', type: 'text'},
        {title: '目的地', field: 'target', type: 'text'},
        {title: '差期', field: 'dateRange', type: 'text'},
        {
          title: '状态',
          field: 'status',
          type: 'enum',
          options: resp['data'],
          clickFn: this.clickFnFlow,
          class: 'text-success',
          cursor: 'pointer'
        },
        {title: '操作', field: 'option', type: 'opt', width: '20%'}
      ];
    });
  }

  /**
   * 方法用途: 模态框确认回调
   * 参数：
   **/
  handleApplyOk() {
    this.https.get(Urls.ERRAND.APPLY + this.selectedItemId, {flowId: this.selectedValue}).then(
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

  loadDepolyedProcess() {
    this.https.get(Urls.WORKFLOW.DEPLOYED, {flowType: 3, key: 'ERRAND'}).then(resp => {
      this.deployedProcess = resp['data'];
    });
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

  showModal(id): void {
    this.selectedItemId = id;
    this.isVisibleApply = true;
  }

  showExamModal(item) {
    this.selectItem = item;
    const _this = this;
    _this.comments = [];
    this.taskImageUrl = '';
    this.https.get(Urls.ERRAND.CURRENT + item['id'], {}).then(resp => {
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

  remove() {
    alert('弹窗');
  }

  edit() {
    alert('前往编辑');
  }

  noProcess(errand) {
    const flag = errand['status'] === 1 && this.permissions(errand);
    return flag;
  }

  isProcessing(errand: any) {
    const flag = errand['status'] === 2 && this.permissions(errand);
    return flag;
  }

  permissions(errand) {
    return true;
  }


  details(v): void {
    this.selected = v;
    this.isVisible = true;
  }

  handleOk(): void {
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
   * 方法用途: 审核模态框确认回调
   * 参数：
   **/
  handleExamOk() {
    console.log(this.selectItem['id']);
    if (!this.selectItem['id']) {
      return this.notification.error('失败', '未找到任务信息');
    }
    this.https.get(Urls.ERRAND.TASKPASS + this.selectItem['id'], {
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

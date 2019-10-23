import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {Properties} from '../../../public/properties';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-zs-project',
  templateUrl: './zs-project.component.html',
  styleUrls: ['./zs-project.component.css']
})
export class ZsProjectComponent implements OnInit {

  /**
   * 页头
   */
  crumbs = {
    title: '项目管理',
    subTitle: '招商项目'
  };

  Urls = Urls;

  isVisible = false;

  projectDetail = {};

  commentForm = {comment: ''};

  /**
   * 属性描述: 分页组建参数
   * 参数：
   **/
  formData: any = {
    totalNum: 21,
    pageSize: 10,
    pageNum: 1,
    name: ''  // 搜索项目名称
  };

  /**
   * 表头
   */
  listHeader = [];

  /**
   * 表格数据
   */
  entities: Array<any> = [];

  commentData = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: '2019-10-10 10:11:23'
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: '2019-10-10 10:11:23'
    }
  ];

  submitting = false;

  authentication = {
    username: '未登录',
    sysRoles: '未知'
  };

  validateForm: FormGroup;

  pComments = [];

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService, private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      projectId: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });

    const _this = this;
    this.authentication = JSON.parse(sessionStorage.getItem('authentication'));
    this.listHeader = [
      {
        title: '项目名称', field: 'name', type: 'text', class: 'text-success', clickFn: function (item) {
          _this.showDetails(item);
        }
      },
      {title: '项目编号', field: 'code', type: 'text'},
      {title: '所属项目', field: 'level.name', type: 'muilti-text', class: Properties.STRING.COLOR.TYPE},
      {title: '创建时间', field: 'createdAt', type: 'date'},
      {title: '操作', field: 'option', type: 'opt', width: '20%'}
    ];
  }

  showDetails(item) {
    const that = this;
    this.isVisible = true;
    this.https.get(this.Urls.ZS_PROJECT.EDIT + item.id).then(
      resp => {
        this.projectDetail = resp['data'];
        that.validateForm.setValue({
          projectId: that.projectDetail['id'],
          comment: ''
        });
        console.log(this.projectDetail['id']);
        this.https.get(Urls.ZS_COMMENTS.LIST, {projectId: this.projectDetail['id']}).then(fulfilled => {
          that.pComments = fulfilled['data'];
        });
      });
  }

  ngOnInit() {
    this.loadEntities();
  }

  /**
   * 加载列表
   */
  loadEntities() {
    this.https.get(Urls.ZS_PROJECT.PAGEQUERY, this.formData).then(resp => {
      this.entities = resp['data']['list'];
      this.formData.pageNum = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
    });
  }

  /**
   * 删除
   * @param param
   */
  remove(param) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + param['name1'] + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        const _this = this;
        this.https.delete(Urls.ZS_PROJECT.DELETE + param['menuId']).then(resp => {
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
      nzOnCancel: () => console.log('操作取消')
    });
  }

  /**
   * 方法用途: 修改
   * 参数：
   **/
  edit(param) {
    this.router.navigate([Urls.BUSINESS.ZS_PROJECT.EDIT], {queryParams: param});
  }

  handleDetailOk() {
    this.isVisible = false;
  }

  handleDetailCancel() {
    this.isVisible = false;
  }


  handleCommentSubmit() {
    console.log(this.validateForm.value);
    this.https.post(Urls.ZS_COMMENTS.SAVE, this.validateForm.value).then(resp => {
      console.log(resp);
    });
  }

  /**
   * 短用户名
   */
  usernameShort() {
    return this.authentication ? this.authentication.username.substring(0, 3) : '';
  }

}

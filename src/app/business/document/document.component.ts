import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Urls} from '../../../public/url';
import {Properties} from '../../../public/properties';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  /**
   * 页头
   */
  crumbs = {
    title: '资源维护',
    subTitle: '文档管理'
  };

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
  listHeader = [
    {title: '文件名称', field: 'dname', type: 'text', class: 'text-success'},
    {title: '类型', field: 'dtype', type: 'text'},
    {title: '大小', field: 'dsize', type: 'text'},
    {title: '创建时间', field: 'createdAt', type: 'date'},
    {title: '上传者', field: 'creator.username', type: 'muilti-text'},
    {title: '操作', field: 'option', type: 'opt', width: '20%'}
  ];

  /**
   * 表格数据
   */
  entities: Array<any> = [];

  constructor(public router: Router, public modalService: NzModalService, public https: HttpsUtils,
              public notification: NzNotificationService) {
  }

  ngOnInit() {
    this.loadEntities();
  }

  /**
   * 加载列表
   */
  loadEntities() {
    this.https.get(Urls.DOCUMENT.PAGEQUERY, this.formData).then(resp => {
      this.entities = resp['data']['list'];
      this.formData.pageNum = resp['data']['pageNum'];
      this.formData.totalNum = resp['data']['total'];
      console.log(this.entities);
    });
  }

  /**
   * 删除
   * @param param 参数
   */
  remove(param) {
    this.modalService.confirm({
      nzTitle: '你确定要删除 ' + param['dname'] + '?',
      nzContent: '<b style="color: red;">该操作不可撤销</b>',
      nzOkText: '是',
      nzOkType: 'danger',
      nzOnOk: () => {
        const _this = this;
        this.https.delete(Urls.DOCUMENT.DELETE + param['id']).then(resp => {
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
  viewFile(param) {
    this.https.get(Urls.DOCUMENT.VIEW + param['id']).then(resp => {
      window.open(resp['data']);
    }, reject => {
      this.notification.error('错误', reject['msg']);
    });
  }

  downLoad(param) {
    window.open(Urls.DOCUMENT.DOWNLOAD + param['id'] + '?access_token=' + sessionStorage.getItem(Properties.STRING.SESSION.ACCESS_TOKEN));
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs = {
    title: '资源维护',
    subTitle: '文档管理'
  };

  /**
   * 构造器
   * @param fb 表单构造器
   * @param router  路由
   * @param https   网络请求
   * @param notification  提示工具
   */
  constructor(public router: Router, public https: HttpsUtils,
              private notification: NzNotificationService) {

  }

  ngOnInit() {
  }

  // tslint:disable-next-line:no-any
  handleChange({file, fileList}: { [key: string]: any }): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.notification.success('成功', '上传成功！');
    } else if (status === 'error') {
      this.notification.success('成功', '上传失败！');
    }
  }
}

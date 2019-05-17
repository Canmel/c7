import {Component, OnInit} from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import {Http} from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';
import propertiesProvider from 'bpmn-js-properties-panel/lib/provider/camunda';
import {CamundaModdleDescriptor} from '../../../../public/config/camunda_moddle_descriptor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpsUtils} from '../../../utils/HttpsUtils.service';
import {Urls} from '../../../../public/url';
import {NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-work-flow-add',
  templateUrl: './work-flow-add.component.html',
  styleUrls: ['./work-flow-add.component.css']
})
export class WorkFlowAddComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '流程管理',
    subTitle: '新建工作流'
  };

  /** 属性用途: bpmn-js 模型创建对象 **/
  private modeler;

  /** 属性用途: modal框 状态 **/
  public isVisible = false;

  /** 属性用途: 表单验证模型 **/
  public validateForm: FormGroup;

  /** 属性用途: bpmn-js 初始模型 地址 **/
  private readonly newDiagram = 'assets/bpmn/newDiagram.bpmn';

  /** 属性用途: 保存SVG请求url **/
  public saveHref;

  /** 属性用途: 保存SVG名称 **/
  public saveName = '';

  /** 属性用途: 表单数据 **/
  public formData = {};

  /** 属性用途: 新建图形初始xml内容 **/
  public newDiagramText = null;

  /** 属性用途: 工作流类型 **/
  public workFlowTypies = [];

  constructor(private router: Router, private notification: NzNotificationService, private fb: FormBuilder, private http: Http, private https: HttpsUtils, private sanitizer: DomSanitizer) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      flowType: [null, [Validators.required]]
    });
    this.initWorkFlowType();
  }

  ngOnInit() {
    this.initBpmn();
  }

  /**
   * 方法用途: 初始化BPMN-js
   * 参数:
   **/
  initBpmn() {
    this.modeler = new BpmnModeler({
      container: '#js-canvas',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        propertiesProvider,
        propertiesPanelModule
      ],
      moddleExtensions: {
        camunda: CamundaModdleDescriptor
      }
    });
    this.createDiagram();
  }

  /**
   * 方法用途: 创建BPMN页面 --画图
   * 参数:
   **/
  createDiagram() {
    this.importDiagram(this.newDiagram);
  }

  /**
   * 方法用途: 请求xml并导入 画出BPMN页面
   * 参数:
   **/
  importDiagram(xml) {
    this.http.get(xml).subscribe(rep => {
      const xmlContent = rep.text();
      this.modeler.importXML(xmlContent, function (err) {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  /**
   * 方法用途: 保存流程 按钮 回调
   * 参数:
   **/
  saveDiagram(e) {
    this.modeler.saveXML({format: true}, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        this.setEncoded(xml, 'bpmn.xml');
        console.log(xml);
        this.newDiagramText = xml;
        this.isVisible = true;
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * 方法用途: 保存SVG图片
   * 参数:
   **/
  saveSVG(e) {
    this.modeler.saveSVG((err, svg) => {
      if (err) {
        console.error(err);
      } else {
        this.setEncoded(svg, 'bpmn.svg');
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * 方法用途: 设置SVG编码集
   * 参数:
   **/
  setEncoded(data, name) {
    const encodedData = encodeURIComponent(data);
    if (data) {
      this.saveHref = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
      this.saveName = name;
    }
  }

  /**
   * 方法用途: modal 成功回调
   * 参数:
   **/
  handleOk(): void {
    console.log('Button ok clicked!');

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.validateForm.value['flow'] = this.newDiagramText;
      console.log(this.validateForm.value);
      this.https.post(Urls.WORKFLOW.SAVE, this.validateForm.value).then(resp => {
        this.isVisible = false;
        this.router.navigate([Urls.BUSINESS.WORKFLOW.LIST]);
        if (resp['code'] === 200) {
          this.notification.success('成功', resp['msg']);
        } else {
          this.notification.error('失败', resp['msg']);
        }
      }, resp => {
        console.log(resp);
      });
    }
  }

  /**
   * 方法用途: modal 失败回调
   * 参数:
   **/
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  /**
   * 方法用途: 重置表单
   * 参数:  事件
   **/
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  /**
   * 方法用途: 初始化工作流类型
   * 参数:
   **/
  initWorkFlowType() {
    this.https.get(Urls.OPTIONS.WORKFLOW.TYPES).then(resp => {
      this.workFlowTypies = resp['data'];
    });
  }

  backToList(event) {
    this.router.navigate([Urls.BUSINESS.WORKFLOW.LIST]);
  }
}

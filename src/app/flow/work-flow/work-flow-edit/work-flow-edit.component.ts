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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-work-flow-edit',
  templateUrl: './work-flow-edit.component.html',
  styleUrls: ['./work-flow-edit.component.css']
})
export class WorkFlowEditComponent implements OnInit {

  /**
   * 属性描述: 面包屑菜单路径
   * 参数：
   **/
  crumbs: any = {
    title: '流程管理',
    subTitle: '编辑工作流'
  };

  /** 属性用途: bpmn-js 模型创建对象 **/
  private modeler;

  /** 属性用途: modal框 状态 **/
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
  
  /** 属性用途: 新建图形初始xml内容 **/
  public newDiagramText = null;

  /** 属性用途: 工作流类型 **/
  public workFlowTypies = [];

  /** 属性用途: 编辑对象接受参数ID使用 **/
  public receiveId = 0;

  constructor(public activatedRoute: ActivatedRoute, private router: Router, private notification: NzNotificationService,
              private fb: FormBuilder, private http: Http, private https: HttpsUtils, private sanitizer: DomSanitizer) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      flowType: ['', [Validators.required]],
      flow: [''],
    });
    this.initWorkFlowType();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.receiveId = queryParams['id'];
      this.loadEntityById(queryParams['id']);
    });
  }

  /**
   * 方法用途: 根据ID获取实体类型详情
   * 参数:
   **/
  loadEntityById(id) {
    this.https.get(Urls.WORKFLOW.EDIT + id).then(resp => {
      const entity = resp['data'];
      this.validateForm.setValue({
        name: entity['name'],
        flowType: entity['flowType'],
        flow: entity['flow'],
      });
      this.initBpmn();
    });

  }

  /**
   * 方法用途: 初始化BPMN-JS
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
   * 方法用途: 创建图像
   * 参数:
   **/
  createDiagram() {
    this.modeler.importXML(this.validateForm.value['flow'], function (err) {
      if (err) {
        console.error(err);
      }
    });
  }

  /**
   * 方法用途: 保存流程点击回调 -- 打开modal窗口，保存数据
   * 参数:
   **/
  saveDiagram(e) {
    this.modeler.saveXML({format: true}, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        this.setEncoded(xml, 'bpmn.xml');
        this.newDiagramText = xml;
        this.isVisible = true;
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * 方法用途: 保存SVG
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
   * 方法用途: SVG下载设置编码集
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
   * 方法用途: modal 确定回调
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
      this.https.put(Urls.WORKFLOW.EDIT + this.receiveId, this.validateForm.value).then(resp => {
        this.isVisible = false;
        this.router.navigate([Urls.BUSINESS.WORKFLOW.LIST]);
        if (resp['httpStatus'] === 200) {
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
   * 方法用途: modal 取消事件回调
   * 参数:
   **/
  handleCancel(): void {
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
   * 方法用途: 获取工作流类型枚举类型
   * 参数:
   **/
  initWorkFlowType() {
    this.https.get(Urls.OPTIONS.WORKFLOW.TYPES).then(resp => {
      this.workFlowTypies = resp['data'];
    });
  }

  /**
   * 方法用途: 返回列表页面
   * 参数：
   **/
  backToList(event) {
    this.router.navigate([Urls.BUSINESS.WORKFLOW.LIST]);
  }

  /**
   * 方法用途: 下拉栏选择回调
   * 参数：
   **/
  nzListOfSelectedValueChange() {
    this.validateForm.controls['flowType'].markAsPristine();
    this.validateForm.controls['flowType'].updateValueAndValidity();
  }
}

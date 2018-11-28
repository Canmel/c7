import {Component, OnInit} from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import {Http} from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';
import propertiesProvider from 'bpmn-js-properties-panel/lib/provider/camunda';
import {CamundaModdleDescriptor} from '../../../../public/config/camunda_moddle_descriptor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-work-flow-add',
  templateUrl: './work-flow-add.component.html',
  styleUrls: ['./work-flow-add.component.css']
})
export class WorkFlowAddComponent implements OnInit {

  private modeler;

  public isVisible = false;

  public validateForm: FormGroup;

  private readonly newDiagram = 'assets/bpmn/newDiagram.bpmn';

  public saveHref;

  public saveName = '';

  public formData = {};

  public newDiagramText = null;

  constructor(private fb: FormBuilder, private http: Http, private sanitizer: DomSanitizer) {
    this.validateForm = this.fb.group({
      flowname: ['', [Validators.required]],
      flowType: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.initBpmn();
  }

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

  createDiagram() {
    this.importDiagram(this.newDiagram);
  }

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

  saveDiagram(e) {
    this.modeler.saveXML({format: true}, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        this.setEncoded(xml, 'bpmn.xml');
        console.log(xml);
        // this.newDiagram = xml;
        // this.newDiagram = xml;
        this.newDiagramText = xml;
        this.isVisible = true;
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

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

  setEncoded(data, name) {
    const encodedData = encodeURIComponent(data);
    if (data) {
      this.saveHref = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
      this.saveName = name;
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.isVisible = false;
    }
    this.validateForm.value['flow'] = this.newDiagramText;
    console.log(this.validateForm.value);
  }

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
}

import { Component, OnInit } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-work-flow-add',
  templateUrl: './work-flow-add.component.html',
  styleUrls: ['./work-flow-add.component.css']
})
export class WorkFlowAddComponent implements OnInit {

  private modeler;

  private readonly newDiagram = 'assets/demo1.bpmn';

  public saveHref;

  public saveName = '';

  constructor(private http: Http, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.initBpmn();
  }

  initBpmn() {
    this.modeler = new BpmnModeler({
      container: '#js-canvas'
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

}

import {ProcessDetails} from '../model/process/process-details';
import {BaseEvent} from '../model/process/base-event';
import {Start} from '../model/process/start';
import {End} from '../model/process/end';
import {Task} from '../model/process/task';
import {Getway} from '../model/process/getway';
import {Polyline} from '../model/process/polyline';

export class BPMUtil {
  static generateXML(processDetails: ProcessDetails, rects: Array<BaseEvent>, polyLines: Array<Polyline>): string {
    let result = '';
    result +=
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
      'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
      'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://bpmn.io/schema/bpmn" ' +
      'xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">' +
      '  <process id="' + processDetails.getBusniessKey() + '" name="' + processDetails.name + '" isExecutable="true"> \n' +
      this.generateProcess(rects, polyLines) +
      this.generateSequenceFlow(polyLines) +
      '  </process> \n' +
      this.generateBPMNdi(rects, polyLines, processDetails) +
      '</definitions>';
    return result;
  }

  static generateBPMNdi(rects: Array<BaseEvent>, polyLines: Array<Polyline>, processDetails: ProcessDetails): string {
    let result = '';
    result +=
      '  <bpmndi:BPMNDiagram id="BPMNDiagram_1"> \n' +
      '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="' + processDetails.getBusniessKey() + '"> \n' +
      this.generateBPMNDIDetails(rects, polyLines) +
      '    </bpmndi:BPMNPlane> \n' +
      '  </bpmndi:BPMNDiagram> \n';
    return result;
  }

  static generateBPMNDIDetails(rects: Array<BaseEvent>, polyLines: Array<Polyline>): string {
    let result = '';
    rects.forEach(function (rect: BaseEvent, index: number) {
      result +=
        '      <bpmndi:BPMNShape id="' + rect.id + '_di" bpmnElement="' + rect.id + '"> \n' +
        '        <dc:Bounds x="' + rect.centerX() + '" y="' + rect.centerY() + '" ' +
        'width="' + rect.horizontal() + '" height="' + rect.longitudinal() + '" /> \n' +
        '        <bpmndi:BPMNLabel> \n' +
        '          <dc:Bounds x="' + rect.centerX() + '" y="' + rect.centerY() + '" width="22" height="14" /> \n' +
        '        </bpmndi:BPMNLabel> \n' +
        '      </bpmndi:BPMNShape> \n';
    });

    polyLines.forEach(function (polyLine) {
      result +=
        '      <bpmndi:BPMNEdge id="' + polyLine.id + '_di" bpmnElement="' + polyLine.id + '"> \n' +
        '        <di:waypoint x="' + polyLine.points[0].x + '" y="' + polyLine.points[0].y + '" /> \n' +
        '        <di:waypoint x="' + polyLine.points[polyLine.points.length - 1].x + '" ' +
        'y="' + polyLine.points[polyLine.points.length - 1].y + '" /> \n' +
        '      </bpmndi:BPMNEdge> \n';
    });

    return result;
  }

  static generateProcess(rects: Array<BaseEvent>, polyLines: Array<Polyline>): string {
    const _this = this;
    let result = '';
    rects.forEach(function (item, index) {
      result += '    <' + item.xmlTagName + ' id="' + item.id + '" name="' + item.name + '"> \n';
      result += _this.generateAssignee(item);
      result += '    </' + item.xmlTagName + '> \n';
    });
    return result;
  }

  static generateAssignee(rect: BaseEvent): string {
    let assignee = '';
    if (rect.role) {
      assignee =
        '      <potentialOwner>\n' +
        '        <resourceAssignmentExpression>\n' +
        '          <formalExpression>user(' + rect.role + '), group(' + rect.role + ')</formalExpression>\n' +
        '        </resourceAssignmentExpression>\n' +
        '      </potentialOwner>\n';
    }
    return assignee;
  }

  static generateSequenceFlow(polyLines: Array<Polyline>): string {
    let result = '';
    polyLines.forEach(function (item, index) {
      result += '    <sequenceFlow id="' + item.id + '" sourceRef="' + item.startRect.id + '" targetRef="' + item.endRect.id + '" /> \n';
    });

    return result;
  }
}

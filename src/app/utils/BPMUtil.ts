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
    result += '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
      'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
      'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://bpmn.io/schema/bpmn" ' +
      'xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"> \n' +
      '<process id="' + processDetails.busniessKey + '" name="' + processDetails.name + '" isExecutable="true"> \n' +
      this.generateProcess(rects) +
      this.generateSequenceFlow(polyLines) +
      '</process> \n' +
      '</definitions> \n';
    return result;
  }

  static generateProcess(rects: Array<BaseEvent>): string {
    let result = '';
    rects.forEach(function (item) {
      if (item instanceof Start) {
        result += '<' + item.xmlTagName + ' id="' + item.id + '" name="' + item.name + '" >' +
          '</' + item.xmlTagName + '> \n';
      }
      if (item instanceof End) {
        result += '<' + item.xmlTagName + ' id="' + item.id + '" name="' + item.name + '" >' +
          '</' + item.xmlTagName + '> \n';
      }
      if (item instanceof Task) {
        result += '<' + item.xmlTagName + ' id="' + item.id + '" name="' + item.name + '" >' +
          '</' + item.xmlTagName + '> \n';
      }
      if (item instanceof Getway) {
        result += '<' + item.xmlTagName + ' id="' + item.id + '" name="' + item.name + '" >' +
          '</' + item.xmlTagName + '> \n';
      }
    });
    return result;
  }

  static generateSequenceFlow(polyLines: Array<Polyline>): string {
    let result = '';
    polyLines.forEach(function (item, index) {
      result += '<sequenceFlow id="sequenceFlow_' + index + '" ' +
        'name="flow_' + index + '" sourceRef="' + item.startRect.id + '" ' +
        'targetRef="' + item.endRect.id + '" /> \n';
    });

    return result;
  }
}

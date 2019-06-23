import {BaseEvent} from './base-event';
import {SvgPoint} from './svg-point';

export class ConnectLine {
  startEvent: BaseEvent;

  endEvent: BaseEvent;

  points: Array<SvgPoint>;


  constructor(startEvent: BaseEvent, endEvent: BaseEvent, points: Array<SvgPoint>) {
    this.startEvent = startEvent;
    this.endEvent = endEvent;
    this.points = points;
  }
}

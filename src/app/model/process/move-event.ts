import {BaseEvent} from './base-event';

export class MoveEvent {
  event: BaseEvent;


  constructor(event: BaseEvent) {
    this.event = event;
  }
}

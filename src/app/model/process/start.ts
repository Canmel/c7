import {BaseEvent} from './base-event';
import {StringUtils} from '../../utils/StringUtils';

export class Start extends BaseEvent {
  radius: number;
  strokeWidth: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.radius = 20;
    this.borderWidth = 8;
    this.strokeWidth = 2;
    this.x = this.correctPosition(x, 0);
    this.y = this.correctPosition(y, 0);
    if (name === undefined || name === '') {
      this.name = '开始';
    } else {
      this.name = name;
    }
    this.type = '开始';
    this.hborder = 0.5 * this.horizontal() + 10;
    this.lborder = 0.5 * this.longitudinal() + 10;
    this.id = Start.name + 'Event_' + StringUtils.getID();
    this.xmlTagName = 'startEvent';
  }

  horizontal(): number {
    return 2 * this.radius + this.borderWidth;
  }

  longitudinal(): number {
    return 2 * this.radius + this.borderWidth;
  }

  setX(x: number): Start {
    this.x = this.correctPosition(x, 0);
    return this;
  }

  setY(y: number): Start {
    this.y = this.correctPosition(y, 0);
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}

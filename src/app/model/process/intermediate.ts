import {BaseEvent} from './base-event';
import {StringUtils} from '../../utils/StringUtils';

export class Intermediate extends BaseEvent{
  radius: number;
  radiusInner: number;
  strokeWidth: number;
  strokeWidthInner: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.radius = 20;
    this.radiusInner = 14;
    this.strokeWidthInner = 5;
    this.strokeWidth = 2;
    this.borderWidth = 8;
    this.x = x;
    this.y = y;
    if (name === undefined || name === '') {
      this.name = '中继';
    } else {
      this.name = name;
    }
    this.type = '中继';
    this.hborder = 0.5 * this.horizontal() + this.borderWidth + 10;
    this.lborder = 0.5 * this.longitudinal() + this.borderWidth + 10;
    this.role = '1';
    this.id = Intermediate.name + 'Event_' + StringUtils.getID();
    this.xmlTagName = 'intermediateEvent';
  }


  horizontal(): number {
    return 2 * this.radius + this.borderWidth;
  }

  longitudinal(): number {
    return 2 * this.radius + this.borderWidth;
  }

  setX(x: number): Intermediate {
    this.x = x;
    return this;
  }

  setY(y: number): Intermediate {
    this.y = y;
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}

import {BaseEvent} from './base-event';
import {StringUtils} from '../../utils/StringUtils';

export class Getway extends BaseEvent {
  width: number;
  height: number;
  transform: string;

  constructor(x: number, y: number, name: string) {
    super();
    this.width = 30;
    this.height = 30;

    this.x = this.correctPosition(x, this.width);
    this.y = this.correctPosition(y, this.height);
    this.transform = 'rotate(45, ' + x + ', ' + y + ')';
    this.type = '路由';
    this.hborder = 0.5 * this.horizontal() + this.borderWidth + 15;
    this.lborder = 0.5 * this.longitudinal() + this.borderWidth + 15;
    this.role = '1';
    this.id = Getway.name + 'Event_' + StringUtils.getID();
    this.xmlTagName = 'getWayEvent';
  }


  horizontal(): number {
    return 1.5 * this.width + this.borderWidth;
  }

  longitudinal(): number {
    return this.height;
  }

  setTransForm(x: number, y: number): Getway {
    this.transform = 'rotate(45, ' + x + ', ' + y + ')';
    return this;
  }

  setX(x: number): Getway {
    this.x = this.correctPosition(x, this.width);
    return this;
  }

  setY(y: number): Getway {
    this.y = this.correctPosition(y, this.height);
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }

  centerX(): number {
    return this.x + 0.5 * this.width;
  }

  centerY(): number {
    return this.y + 0.5 * this.height;
  }
}

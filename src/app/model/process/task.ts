import {BaseEvent} from './base-event';
import {StringUtils} from '../../utils/StringUtils';

export class Task extends BaseEvent {
  width: number;
  height: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.width = 120;
    this.height = 50;
    this.x = this.correctPosition(x, this.width);
    this.y = this.correctPosition(y, this.height);
    if (name === undefined || name === '') {
      this.name = '未命名任务';
    } else {
      this.name = name;
    }
    this.type = '任务';
    this.hborder = 0.5 * this.horizontal() + this.borderWidth + 10;
    this.lborder = 0.5 * this.longitudinal() + this.borderWidth + 10;
    this.role = '0';
    this.id = Task.name + 'Event_' + StringUtils.getID();
    this.xmlTagName = 'userTask';
  }

  centerX(): number {
    return this.x + 0.5 * this.width;
  }

  centerY(): number {
    return this.y + 0.5 * this.height;
  }


  horizontal(): number {
    return this.width + this.borderWidth + 2;
  }

  longitudinal(): number {
    return this.height + this.borderWidth + 2;
  }

  setX(x: number): Task {
    this.x = this.correctPosition(x, this.width);
    return this;
  }

  setY(y: number): Task {
    this.y = this.correctPosition(y, this.height);
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}

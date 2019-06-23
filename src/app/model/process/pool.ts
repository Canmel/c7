import {BaseEvent} from './base-event';

export class Pool extends BaseEvent {
  width: number;
  height: number;
  twidth: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.width = 500;
    this.height = 300;
    this.twidth = 40;
    this.x = this.correctPosition(x, this.width);
    this.y = this.correctPosition(y, this.height);
    if (name === undefined || name === '') {
      this.name = '泳道';
    } else {
      this.name = name;
    }
    this.type = '泳道';
    this.hborder = 0.5 * this.horizontal() + this.borderWidth + 10;
    this.lborder = 0.5 * this.longitudinal() + this.borderWidth + 10;
    this.role = '1';
  }

  horizontal(): number {
    return this.width + 5;
  }

  longitudinal(): number {
    return this.height + this.borderWidth;
  }

  setX(x: number): Pool {
    this.x = this.correctPosition(x, this.width);
    return this;
  }

  setY(y: number): Pool {
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

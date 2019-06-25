import {SvgPoint} from './svg-point';
import {BaseEvent} from './base-event';
import {StringUtils} from '../../utils/StringUtils';

export class Polyline {
  points: Array<SvgPoint>;
  startRect: BaseEvent;
  endRect: BaseEvent;
  minClearanceX: number;
  minClearanceY: number;
  mainColor: string;
  pointStrs: Array<string>;
  id: string;

  constructor(startRect: BaseEvent, endRect: BaseEvent) {
    this.startRect = startRect;
    this.endRect = endRect;
    this.minClearanceX = 120;
    this.minClearanceY = 70;
    this.mainColor = 'black';
    this.setPoints();
    this.id = 'SequenceFlow_' + StringUtils.getID();
  }

  setPoints() {
    this.points = [];
    // 加点
    this.points.push(new SvgPoint(this.startRect.centerX(), this.startRect.centerY()));
    this.points.push(new SvgPoint(this.endRect.centerX(), this.endRect.centerY()));
    this.setTortuousPoint();
    const result = new Array<any>();
    const _this = this;
    _this.pointStrs = [];
    // 拆点只为显示;
    this.points.forEach(function (value: SvgPoint, index: number) {
      _this.pointStrs.push(value.x + ', ' + value.y);
    });
  }

  // 设置折点
  setTortuousPoint() {
    // 两点相差距离
    const distanceX = this.endRect.centerX() - this.startRect.centerX();
    const distanceY = this.endRect.centerY() - this.startRect.centerY();
    // 两个元素 间隙
    const clearanceX = Math.abs(distanceX) - this.endRect.hborder - this.startRect.hborder;
    const clearanceY = Math.abs(distanceY) - this.endRect.lborder - this.startRect.lborder;
    // 实际看了一下 当 clearanceX > 40 的时候可以先画好水平线，再画垂直，最后画水平线
    if (distanceX > 0 && distanceY > 0) {
      if (Math.abs(distanceX) > this.minClearanceX) {
        this.left2rightLine(clearanceX);
      } else if (Math.abs(distanceY) > this.minClearanceY) {
        this.top2downLine(clearanceY);
      } else {
        this.otherLine();
      }
    } else if (distanceX > 0 && distanceY < 0) {
      if (Math.abs(distanceX) > this.minClearanceX) {
        this.left2rightLine(clearanceX);
      } else if (Math.abs(distanceY) > this.minClearanceY) {
        this.down2topLine(clearanceY);
      } else {
        this.otherLine();
      }
    } else if (distanceX < 0 && distanceY > 0) {
      if (Math.abs(distanceX) > this.minClearanceX) {
        this.right2leftLine(clearanceX);
      } else if (Math.abs(distanceY) > this.minClearanceY) {
        this.top2downLine(clearanceY);
      } else {
        this.otherLine();
      }
    } else if (distanceX < 0 && distanceY < 0) {
      if (Math.abs(distanceX) > this.minClearanceX) {
        this.right2leftLine(clearanceX);
      } else if (Math.abs(distanceY) > this.minClearanceY) {
        this.down2topLine(clearanceY);
      } else {
        this.otherLine();
      }
    } else {
      this.otherLine();
    }
  }

  otherLine() {
    this.points[1].y -= this.endRect.lborder;
    let rectY = 0;
    rectY = this.startRect.centerY() > this.endRect.centerY() ? this.endRect.centerY() : this.startRect.centerY();
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.startRect.centerX(), rectY - this.minClearanceX - 0.5 * this.startRect.longitudinal()));
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.endRect.centerX(), rectY - this.minClearanceX - 0.5 * this.startRect.longitudinal()));
  }

  left2rightLine(clearanceX) {
    this.points[1].x -= this.endRect.hborder;
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.startRect.centerX() + this.startRect.hborder + 0.5 * clearanceX, this.startRect.centerY()));
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.startRect.centerX() + this.startRect.hborder + 0.5 * clearanceX, this.endRect.centerY()));
  }

  right2leftLine(clearanceX) {
    this.points[1].x += this.endRect.hborder;
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.startRect.centerX() - this.startRect.hborder - 0.5 * clearanceX, this.startRect.centerY()));
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.startRect.centerX() - this.startRect.hborder - 0.5 * clearanceX, this.endRect.centerY()));
    console.log(this.points);
  }

  down2topLine(clearanceY) {
    this.points[1].y += this.endRect.lborder;
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.startRect.centerX(), this.startRect.centerY() + 0.5 * (clearanceY + this.startRect.longitudinal())));
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.endRect.centerX(), this.startRect.centerY() + 0.5 * (clearanceY + this.startRect.longitudinal())));
  }

  top2downLine(clearanceY) {
    this.points[1].y -= this.endRect.lborder;
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.startRect.centerX(), this.startRect.centerY() + 0.5 * (clearanceY + this.startRect.longitudinal())));
    this.points.splice(this.points.length - 1, 0,
      new SvgPoint(this.endRect.centerX(), this.startRect.centerY() + 0.5 * (clearanceY + this.startRect.longitudinal())));
  }

  setStartRect(value: BaseEvent) {
    this.startRect = value;
    this.setPointeAndStr();
  }

  setEndRect(value: BaseEvent) {
    this.endRect = value;
    this.setPointeAndStr();
  }

  setPointeAndStr() {
    this.points = [];
    this.points.push(new SvgPoint(this.startRect.centerX(), this.startRect.centerY()));
    this.points.push(new SvgPoint(this.endRect.centerX(), this.endRect.centerY()));
    this.setTortuousPoint();
    this.pointStrs = [];
    const _this = this;
    this.points.forEach(function (value: SvgPoint, index: number) {
      _this.pointStrs.push(value.x + ', ' + value.y);
    });
  }
}

export class BaseEvent {
  x: number;
  y: number;
  name: string;
  mainColor: string;
  selected: boolean;
  borderWidth: number;
  skin: string;
  showTools: boolean;
  width: number;
  height: number;
  hborder: number;
  lborder: number;
  twidth: number;
  type: string;
  role: any;
  // strokeWidth: any;

  constructor() {
    this.mainColor = '#fff';
    this.skin = '#faad14';
    this.selected = false;
    this.showTools = false;
    this.borderWidth = 3;
    this.width = 0;
    this.height = 0;
    this.type = '未知';
    this.hborder = 0.5 * this.horizontal() + this.borderWidth + 10;
    this.lborder = 0.5 * this.longitudinal() + this.borderWidth + 10;
  }

  horizontal(): number {
    return 0;
  }

  longitudinal(): number {
    return 0;
  }

  setTrueX(x: number): BaseEvent {
    this.x = x;
    return this;
  }

  setTrueY(y: number): BaseEvent {
    this.y = y;
    return this;
  }

  centerX(): number {
    return this.x;
  }

  centerY(): number {
    return this.y;
  }
}

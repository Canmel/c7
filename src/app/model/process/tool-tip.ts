export class ToolTip {
  message: string;
  x: number;
  y: number;
  show: boolean;

  constructor(message: string, x: number, y: number) {
    this.message = message !== '' ? '创建一个' + message + '事件' : message;
    this.x = x + 10;
    this.y = y + 20;
    this.show = true;
  }
}

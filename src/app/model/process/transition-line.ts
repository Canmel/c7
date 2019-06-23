export class TransitionLine {
  x: number;
  y: number;
  stroke: string;
  strokeWidth: number;
  terminalX: number;
  terminalY: number;

  constructor(x: number, y: number, x2: number, y2: number) {
    this.x = x;
    this.y = y;
    this.terminalX = x2;
    this.terminalY = y2;
    this.strokeWidth = 2;
    this.stroke = 'green';
  }

  setTerminalX (x: number) {
    this.terminalX = x;
  }

  setTerminalY (y: number) {
    this.terminalY = y;
  }
}

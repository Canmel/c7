import {Component, OnInit} from '@angular/core';
import {Task} from '../../model/process/task';
import {ToolTip} from '../../model/process/tool-tip';
import {Start} from '../../model/process/start';
import {End} from '../../model/process/end';
import {Intermediate} from '../../model/process/intermediate';
import {BaseEvent} from '../../model/process/base-event';
import {Getway} from '../../model/process/getway';
import {Pool} from '../../model/process/pool';
import * as $ from 'jquery';
import {TransitionLine} from '../../model/process/transition-line';
import {Polyline} from '../../model/process/polyline';
import {FormGroup} from '@angular/forms';
import {ProcessDetails} from '../../model/process/process-details';
import {BPMUtil} from '../../utils/BPMUtil';
import {Urls} from '../../../public/url';
import {HttpsUtils} from '../../utils/HttpsUtils.service';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-designer',
  templateUrl: './process-designer.component.html',
  styleUrls: ['./process-designer.component.css']
})
export class ProcessDesignerComponent implements OnInit {
  validateForm: FormGroup;

  tasks: Array<Task> = [];

  taskMove: BaseEvent = null;

  starts: Array<Start> = [];

  ends: Array<End> = [];

  intermediates: Array<Intermediate> = [];

  getways: Array<Getway> = [];

  pools: Array<Pool> = [];

  currentTip: ToolTip = new ToolTip('', 0, 0);

  selected: BaseEvent = null;

  transitionLine: TransitionLine = null;

  isShowMoveTask: Boolean = false;

  allRect: Array<BaseEvent> = [];

  processDetails: ProcessDetails;

  operator: Pool;

  svgProperties = {
    scaleX: 1.0,
    scaleY: 1.0,
    // 平移量
    translateX: 0,
    translateY: 0,
    width: 300,
    height: 200,
    cursor: 'pointer',
    drag: false,
    cursorX: 0,
    cursorY: 0
  };

  polyLines: Array<Polyline> = [];

  onItemDrop(e: any) {
    let positionX = e['nativeEvent']['offsetX'];
    positionX = positionX / this.svgProperties.scaleX;
    positionX -= this.svgProperties.translateX;
    let positionY = e['nativeEvent']['offsetY'];
    positionY = positionY / this.svgProperties.scaleY;
    positionY -= this.svgProperties.translateY;

    switch (e.dragData) {
      case('start'):
        this.starts.push(new Start(positionX, positionY, ''));
        break;
      case('end'):
        this.ends.push(new End(positionX, positionY, ''));
        break;
      case('task'):
        this.tasks.push(new Task(positionX, positionY, ''));
        break;
      case('intermediates'):
        this.intermediates.push(new Intermediate(positionX, positionY, ''));
        break;
      case('getway'):
        this.getways.push(new Getway(positionX, positionY, ''));
        break;
      case ('pool'):
        this.pools.push(new Pool(positionX, positionY, ''));
        break;
      default :
    }
  }

  constructor(private https: HttpsUtils, private router: Router, private notification: NzNotificationService) {
    this.processDetails = new ProcessDetails();

  }

  getAllRect(): Array<BaseEvent> {
    return this.allRect.concat(this.tasks).concat(this.starts).concat(this.ends).concat(this.intermediates).concat(this.getways).concat(this.pools);
  }

  ngOnInit() {
    this.svgProperties.width = $('#designer-content').width();
    this.svgProperties.height = $('#designer-content').height();
  }

  svgMouseDownHandler(e) {
    this.svgProperties.drag = true;
    this.transitionLine = null;
    if (this.selected) {
      this.selected = null;
    }
  }

  svgMouseUpHandler($event) {
    this.svgProperties.drag = false;
    this.operator = null;
  }

  rectMouseUpHandler(e) {
    if (this.selected === null) {
      return;
    }
    let moveSuccessFlag = true;
    const _this = this;
    this.getAllRect().forEach(function (value, index, array) {
      if (value !== _this.selected
        && Math.abs(value.centerX() - _this.taskMove.centerX()) <= (value.hborder + _this.selected.hborder)
        && Math.abs(value.centerY() - _this.taskMove.centerY()) <= (value.lborder + _this.selected.lborder)) {
        moveSuccessFlag = false;
      }
    });
    if (moveSuccessFlag) {
      this.selected.setTrueX(this.taskMove.x / this.svgProperties.scaleX - this.svgProperties.translateX)
        .setTrueY(this.taskMove.y / this.svgProperties.scaleY - this.svgProperties.translateY);
      this.findPolyLineAndLineTo(this.selected);
    }
    this.taskMove = null;
    this.isShowMoveTask = false;
  }

  svgMouseMoveHandler(e: any) {
    this.svgProperties.cursorX = e['offsetX'];
    this.svgProperties.cursorY = e['offsetY'];
    if (this.transitionLine) {
      this.transitionLine.terminalX = e['offsetX'];
      this.transitionLine.terminalY = e['offsetY'];
    }
    if (this.taskMove) {
      // 拖动
      if (this.taskMove instanceof Getway) {
        this.taskMove.setTransForm(e['offsetY'], e['offsetX']);
      }
      let moveSuccessFlag = true;
      const _this = this;
      this.getAllRect().forEach(function (value, index, array) {
        if (value !== _this.selected
          && Math.abs(value.centerX() - _this.taskMove.centerX()) <= (value.hborder + _this.selected.hborder)
          && Math.abs(value.centerY() - _this.taskMove.centerY()) <= (value.lborder + _this.selected.lborder)) {
          moveSuccessFlag = false;
        }
      });

      if (!moveSuccessFlag) {
        this.rectToError(e.srcElement);
      } else {
        this.rectToNormal(e.srcElement);
      }

      this.toCurrentPosition(e, this.taskMove);
    } else if (this.operator) {
      this.resizePool(e);
    } else {
      // 平移
      if (this.svgProperties.drag) {
        this.svgProperties.translateX += e.movementX;
        this.svgProperties.translateY += e.movementY;
      }
    }
    this.isShowMoveTask = true;
  }

  rectMouseDownHandler(e: any, item: BaseEvent) {
    const _this = this;
    if (this.transitionLine) {
      if (item !== this.selected) {
        const polyLine = new Polyline(this.selected, item);
        let pushFlag = true;
        this.polyLines.forEach(function (p) {
          if ((p.startRect === _this.selected || p.startRect === item) && (p.endRect === item || p.endRect === _this.selected)) {
            pushFlag = false;
          }
        });
        if (pushFlag) {
          this.polyLines.push(polyLine);
        }
      }
      this.transitionLine = null;
    } else {
      this.transitionLine = null;
      this.selected = item;
      if (this.selected === item) {
        this.selected.showTools = !this.selected.showTools;
      } else {
        this.selected.showTools = true;
      }
      // 使用copy方法，复制一个新的对象，如果只是单纯的赋值，实际上引用的事同一个对象，在angular的双向绑定中，并不能生成临时可移动的组件
      this.taskMove = this.copyNewInstance(item);
      this.toCurrentPosition(e, this.taskMove);
      this.isShowMoveTask = false;
    }

    e.stopPropagation();
  }

  rectClickHandler(e: any, item) {
    // this.isSelected = item;
    this.taskMove = null;
    this.isShowMoveTask = false;
    e.stopPropagation();
  }

  // rect hover事件
  rectMouseOverHandler(e: any, item) {
    if (this.transitionLine) {
      this.isPolyLineError(item) ? this.rectToError(e.srcElement) : this.rectToActive(e.srcElement);
    }
  }

  isPolyLineError(item): boolean {
    const _this = this;
    let pushFlag = false;
    this.polyLines.forEach(function (p) {
      if ((p.startRect === _this.selected || p.startRect === item) && (p.endRect === item || p.endRect === _this.selected)) {
        pushFlag = true;
      }
    });
    return item === this.selected || pushFlag;
  }

  // rect hover 离开事件
  rectMouseOutHandler(e: any, item) {
    this.rectToNormal(e.srcElement);
  }

  rectToError(element: any) {
    $(element).parent().addClass('d-outline-selected-false');
    $(element).addClass('d-outline-selected-false');
  }

  rectToActive(element: any) {
    $(element).parent().addClass('d-outline-selected-true');
    $(element).addClass('d-outline-selected-true');
  }

  rectToNormal(element: any) {
    $(element).parent().removeClass('d-outline-selected-true');
    $(element).removeClass('d-outline-selected-true');
    $(element).parent().removeClass('d-outline-selected-false');
    $(element).removeClass('d-outline-selected-false');
  }

  /**
   * 重新拷贝一个新的svg对象， 避免angular 的双向绑定。使得确保可以生成一个移动任务模块
   * @param item 模块对象
   */
  copyNewInstance(item) {
    const trueX = item.x + this.svgProperties.translateX;
    const trueY = item.y + this.svgProperties.translateY;
    // trueX = trueX / this.svgProperties.scaleX;
    // trueY = trueY / this.svgProperties.scaleY;
    // 当item的实际类型不同，可能有些属性需要自定义，这里不再直接使用超类，而是分成各个组件重新生成
    if (item instanceof Task) {
      const task = new Task(0, 0, item.name);
      // 在赋值x, y 的时候加上偏移量，偏移量初始值已设置为0
      task.setTrueX(trueX).setTrueY(trueY);
      return task;
    }
    if (item instanceof Start) {
      const start = new Start(0, 0, item.name);
      start.setTrueX(trueX).setTrueY(trueY);
      return start;
    }
    if (item instanceof End) {
      const end = new End(0, 0, item.name);
      end.setTrueX(trueX).setTrueY(trueY);
      return end;
    }
    if (item instanceof Intermediate) {
      const intermediate = new Intermediate(0, 0, item.name);
      intermediate.setTrueX(trueX).setTrueY(trueY);
      return intermediate;
    }
    if (item instanceof Getway) {
      const getWay = new Getway(0, 0, item.name);
      getWay.setTransForm(item.x, item.y).setTrueX(trueX).setTrueY(trueY);
      return getWay;
    }
    if (item instanceof Pool) {
      const pool = new Pool(0, 0, item.name);
      pool.setTrueX(trueX).setTrueY(trueY);
      return pool;
    }
  }

  /**
   * 工具栏 鼠标悬浮
   */
  toolsMouseMoveHandler(e, msg) {
    const _this = this;
    if (this.currentTip.message === '') {
      _this.currentTip.message = msg;
      _this.currentTip.x = e['clientX'];
      _this.currentTip.y = e['clientY'];
    }
  }


  /**
   * 工具栏 鼠标移除
   */
  toolsMouseOutHandler() {
    this.currentTip.message = '';
  }

  toolDeleteHandler(e) {
    const items = this.getItemsArray(this.selected);
    const index = items.indexOf(this.selected);
    items.splice(index, 1);
    const _this = this;

    // 删除连接到这个的节点的连线
    const result: Array<Polyline> = [];
    this.polyLines.forEach(function (polyLine) {
      if (!(polyLine.startRect === _this.selected || polyLine.endRect === _this.selected)) {
        result.push(polyLine);
      }
    });
    this.polyLines = result;
    this.selected = null;
  }

  svgWheelHandler(event) {
    if (event.ctrlKey) {
      if ((event.deltaX + event.deltaY) > 0) {
        this.svgProperties.scaleX += 0.03;
        this.svgProperties.scaleY += 0.03;
      } else {
        this.svgProperties.scaleX -= 0.03;
        this.svgProperties.scaleY -= 0.03;
      }
    } else {
      this.svgProperties.translateX = this.svgProperties.translateX - event.deltaX;
      this.svgProperties.translateY = this.svgProperties.translateY - event.deltaY;
    }
    event.stopPropagation();
    return false;
  }

  // 泳道大小调节器
  operatorRectMouseOverHandler(e: any, item: Pool) {
    console.log('do hover');
    $(e.srcElement).addClass('operator-pool');
  }

  // 泳道大小调节器
  operatorRectMouseDownHandler(e: any, item: Pool) {
    this.operator = item;
    $(e.srcElement).addClass('operator-pool-move');
    e.stopPropagation();
  }

  operatorRectMouseOutHandler(e: any, item: Pool) {
    $(e.srcElement).removeClass('operator-pool');
    $(e.srcElement).removeClass('operator-pool-move');
  }

  operatorRectMouseUpHandler(e: any, item: Pool) {
    this.operator = null;
  }

  showTransition(e) {
    this.selected.showTools = false;
    this.transitionLine = new TransitionLine(this.selected.centerX(),
      this.selected.centerY(),
      this.svgProperties.cursorX, this.svgProperties.cursorY);
  }

  toCurrentPosition(e, item) {
    item.setX(e['offsetX']).setY(e['offsetY']);
  }

  toTrueCurrentPosition(e, item) {
    item.setTrueX(e['offsetX']).setTrueY(e['offsetY']);
  }

  isSelected(item) {
    return item.isSelected;
  }

  isShowRect(item: BaseEvent): boolean {
    if (item instanceof Task) {
      return true;
    }
    return false;
  }

  isShowText(item: BaseEvent): boolean {
    if (item instanceof Task) {
      return true;
    }
    return false;
  }

  isShowCircle(item: BaseEvent): boolean {
    if (item instanceof End) {
      return true;
    }
    if (item instanceof Start) {
      return true;
    }
    if (item instanceof Intermediate) {
      return true;
    }
    return false;
  }

  isShowInnerCircle(item: BaseEvent): boolean {
    if (item instanceof Intermediate) {
      return true;
    }
    return false;
  }

  isShowGetWay(item: BaseEvent): boolean {
    if (item instanceof Getway) {
      return true;
    }
    return false;
  }

  isShowPool(item: BaseEvent): boolean {
    if (item instanceof Pool) {
      return true;
    }
    return false;
  }

  wheelTools(e) {
    e.stopPropagation();
    return false;
  }

  getItemsArray(item): Array<BaseEvent> {
    if (item instanceof Start) {
      return this.starts;
    }
    if (item instanceof End) {
      return this.ends;
    }
    if (item instanceof Task) {
      return this.tasks;
    }
    if (item instanceof Getway) {
      return this.getways;
    }
    if (item instanceof Intermediate) {
      return this.intermediates;
    }
    if (item instanceof Pool) {
      return this.pools;
    }
  }

  // 寻找关于某个节点的折线并且修正
  findPolyLineAndLineTo(item: BaseEvent) {
    const _this = this;
    this.polyLines.forEach(function (polyline: Polyline, index: number) {
      if (polyline.startRect === _this.selected) {
        _this.polyLines[index].setStartRect(_this.selected);
      }
      if (polyline.endRect === _this.selected) {
        _this.polyLines[index].setEndRect(_this.selected);
      }
    });
  }

  resizePool(e: any) {
    if (this.operator) {
      this.operator.width = e.offsetX - this.operator.x - this.svgProperties.translateX;
      this.operator.height -= e.movementY;
      this.operator.y += e.movementY;
    }
    console.log(this.operator.y, this.operator.height);
  }

  saveHandler() {
    this.https.post(Urls.WORKFLOW.SAVE, this.getSaveValue()).then(resp => {
      // this.isVisible = false;
      this.router.navigate([Urls.BUSINESS.WORKFLOW.LIST]);
      if (resp['code'] === 200) {
        this.notification.success('成功', resp['msg']);
      } else {
        this.notification.error('失败', resp['msg']);
      }
    }, resp => {
      console.log(resp);
    });
  }

  getSaveValue(): any {
    const result = {};
    result['name'] = this.processDetails.name;
    result['key'] = this.processDetails.busniessKey;
    result['flow'] = BPMUtil.generateXML(this.processDetails, this.getAllRect(), this.polyLines);
    return result;
  }

}

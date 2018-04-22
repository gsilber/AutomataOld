import { FsmDrawStateComponent } from './../fsm-draw-state/fsm-draw-state.component';
import { ChildMouseEvent } from './../fsm-draw-surface/fsm-draw-surface.component';
import { FsmTransition } from './../../../fsm-core/services/fsm-data.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-draw-transition]',
  templateUrl: './fsm-draw-transition.component.html',
  styleUrls: ['./fsm-draw-transition.component.css']
})
export class FsmDrawTransitionComponent implements AfterViewInit {

  @Input() transition: FsmTransition = null;
  @Input() selected: boolean;
  @Output() transitionclick: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitiondblclick: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitioncontextmenu: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitionmousedown: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitionmouseenter: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitionmouseleave: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitionmousemove: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitionmouseout: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitionmouseover: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @Output() transitionmouseup: EventEmitter<ChildMouseEvent> = new EventEmitter<ChildMouseEvent>();
  @ViewChild('textEl') textElement: ElementRef;

  textheight = 0;


  private get deltaX() {
    return this.transition.sourceState.x - this.transition.destState.x;
  }
  private get deltaY() {
    return this.transition.sourceState.y - this.transition.destState.y;
  }
  get length() {
    return Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2)) - this.stateRadius;
  }

  get projection() {
    return { x: this.transition.sourceState.x + this.length, y: this.transition.sourceState.y };
  }

  get theta() {
    return Math.atan2(this.transition.destState.y - this.transition.sourceState.y,
      this.transition.destState.x - this.transition.sourceState.x)
      * (180.0 / Math.PI);
  }

  get thetai() { return Math.floor(this.theta); }
  get stateRadius() { return FsmDrawStateComponent.stateRadius; }

  get textRotate() {
    const angle = Math.abs(this.theta);
    if (angle > 90 && angle < 180) {
      return 180;
    }
  }

  get curvy() {
    // control point angle
    const cpoint = {
      x: (this.transition.sourceState.x + (this.length + this.stateRadius) / 2),
      y: (this.transition.sourceState.y + this.transition.rotation)
    };
    const spt = { x: (this.transition.sourceState.x), y: (this.transition.sourceState.y) };
    const dpt = { x: (this.transition.sourceState.x + this.length + this.stateRadius), y: this.transition.sourceState.y };
    const theta = Math.atan((cpoint.y - spt.y) / (cpoint.x - spt.x));
    const offset = { x: this.stateRadius * Math.cos(theta), y: this.stateRadius * Math.sin(theta) };
    return ' M ' + (spt.x + offset.x) + ' ' + (spt.y + offset.y)
      + ' Q ' + cpoint.x + ' ' + cpoint.y + ' ' + (dpt.x - offset.x) + ' ' + (dpt.y + offset.y);
  }

  get linkToSelfPath() {
    const p1 = (this.transition.destState.x + this.stateRadius) + ' ' + this.transition.destState.y;
    const p2 = this.transition.destState.x + ' ' + (this.transition.destState.y + this.stateRadius + 14);
    return 'M' + p1 + ' A ' + this.stateRadius + ' ' + this.stateRadius + ' 0 1 1 ' + p2;
  }

  constructor(private _detect: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.textheight = (this.textElement.nativeElement.getBBox().height + 10);
    this._detect.detectChanges();
  }


  onClick = (evt: MouseEvent) => {
    this.transitionclick.emit({ srcEvent: evt, child: this.transition, type: 'transition' });
    if (this.transition.destState.name !== 'temp') { evt.stopPropagation(); return false; }
  }
  onDblClick = (evt: MouseEvent) => {
    this.transitiondblclick.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onContextMenu = (evt: MouseEvent) => {
    this.transitioncontextmenu.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onMouseDown = (evt: MouseEvent) => {
    this.transitionmousedown.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onMouseEnter = (evt: MouseEvent) => {
    this.transitionmouseenter.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onMouseLeave = (evt: MouseEvent) => {
    this.transitionmouseleave.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onMouseMove = (evt: MouseEvent) => {
    this.transitionmousemove.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onMouseOut = (evt: MouseEvent) => {
    this.transitionmouseout.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onMouseOver = (evt: MouseEvent) => {
    this.transitionmouseover.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }
  onMouseUp = (evt: MouseEvent) => {
    this.transitionmouseup.emit({ srcEvent: evt, child: this.transition, type: 'transition' }); evt.stopPropagation(); return false;
  }

}

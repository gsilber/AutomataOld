import { FsmEvent } from './../classes/FsmEvents';
import { FsmTransition } from './../classes/Fsm';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-fsm-draw-transition]',
  templateUrl: './fsm-draw-transition.component.html',
  styleUrls: ['./fsm-draw-transition.component.css']
})
export class FsmDrawTransitionComponent {
  @Input() radius: number;
  @Input() transition: FsmTransition;
  @Input() selected: boolean;
  @Output() click: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mousedown: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mouseup: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mousemove: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();

  get transitionlength() {
    const deltaX = this.transition.startState.position.x - this.transition.endState.position.x;
    const deltaY = this.transition.startState.position.y - this.transition.endState.position.y;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  }
  get transitionangle() {
    return Math.atan2(this.transition.endState.position.y - this.transition.startState.position.y,
      this.transition.endState.position.x - this.transition.startState.position.x)
      * (180.0 / Math.PI);
  }
  get transitionPath() {
    const spt = this.transition.startState.position;
    if (this.transition.startState === this.transition.endState) {
      const p1 = (spt.x + this.radius) + ' ' + spt.y;
      const p2 = spt.x + ' ' + (spt.y + this.radius + 6);
      return 'M' + p1 + ' A ' + this.radius + ' ' + this.radius + ' 0 1 1 ' + p2;
    } else {
      const length = this.transitionlength;
      const dpt = { x: (spt.x + length), y: spt.y };
      const cpoint = {x: spt.x + (length / 2), y: spt.y + this.transition.rotation};
      const theta = Math.atan((cpoint.y - spt.y) / (cpoint.x - spt.x));
      const offset = { x: this.radius * Math.cos(theta), y: this.radius * Math.sin(theta) };
      return ' M ' + (spt.x + offset.x) + ' ' + (spt.y + offset.y)
        + ' Q ' + cpoint.x + ' ' + cpoint.y + ' ' + (dpt.x - offset.x) + ' ' + (dpt.y + offset.y);
    }
  }

  get rotationTransform() {
    if (this.transition.startState === this.transition.endState) {
      return 'rotate(' + this.transition.rotation + ',' + this.transition.startState.position.x +
        ',' + this.transition.startState.position.y + ')';
    }
    return '';
  }
  constructor() { }
  onCLick(evt) {
    this.click.emit({ srcElement: this.transition, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseDown(evt) {
    this.mousedown.emit({ srcElement: this.transition, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseUp(evt) {
    this.mouseup.emit({ srcElement: this.transition, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseMove(evt) {
    this.mousemove.emit({ srcElement: this.transition, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }

}

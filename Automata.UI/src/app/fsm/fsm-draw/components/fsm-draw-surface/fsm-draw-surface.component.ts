import { Output, Component, OnInit, EventEmitter, ElementRef } from '@angular/core';

export class SurfaceMouseEvent {
  surfaceX: number;
  surfaceY: number;

  srcEvent: MouseEvent;
  constructor(srcEvent: MouseEvent, x: number, y: number) {
    this.srcEvent = srcEvent;
    this.surfaceX = x;
    this.surfaceY = y;
  }
}

@Component({
  selector: 'app-fsm-draw-surface',
  templateUrl: './fsm-draw-surface.component.html',
  styleUrls: ['./fsm-draw-surface.component.css']
})
export class FsmDrawSurfaceComponent implements OnInit {

  @Output() surfaceclick: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemousedown: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseenter: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseleave: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemousemove: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseout: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseover: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseup: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  // override all mouse events, attach old event and calculate svg coordinates
  onClick = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfaceclick);
  onMouseDown = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemousedown);
  onMouseEnter = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseenter);
  onMouseLeave = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseleave);
  onMouseMove = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemousemove);
  onMouseOut = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseout);
  onMouseOver = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseover);
  onMouseUp = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseup);

  private fireAugmentedMouseEvent(evt: MouseEvent, emitter: EventEmitter<SurfaceMouseEvent>): boolean {
    const pt = this.clientToSurface(evt.clientX, evt.clientY);
    emitter.emit(new SurfaceMouseEvent(evt, pt.x, pt.y));
    evt.stopPropagation();
    return false;
  }
  private clientToSurface = (x: number, y: number) => {
    const pt = this._elementRef.nativeElement.children[0].createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(this._elementRef.nativeElement.children[0].getScreenCTM().inverse());
  }

}

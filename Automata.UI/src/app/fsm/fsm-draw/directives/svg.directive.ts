import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

class SVGPoint {
  x: number;
  y: number;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[svgContainer]'
})
export class SvgDirective {

  @Output() surfaceClick: EventEmitter<SVGPoint> = new EventEmitter<SVGPoint>()

  constructor(private _elementRef: ElementRef) { }

  private clientToSurface = (x: number, y: number) => {
    const pt = this._elementRef.nativeElement.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(this._elementRef.nativeElement.getScreenCTM().inverse());
  }

  @HostListener('click', ['$event'])
  onClick = (event) => {
    this.surfaceClick.emit(this.clientToSurface(event.clientX, event.clientY));
  }

}

import { Component, Input } from '@angular/core';
import { Fsm } from '../classes/Fsm';

@Component({
  selector: 'app-fsm-draw-surface',
  templateUrl: './fsm-draw-surface.component.html',
  styleUrls: ['./fsm-draw-surface.component.css']
})
export class FsmDrawSurfaceComponent {

  @Input() set dimension(val) {
    this._dimension = val;
    this.scrollvalue = val;
  }
  @Input() set zoompercent(val) {
    this.scrollvalue = this.dimension / (val / 100.0);
  }
  @Input() fsm: Fsm;

  get dimension() {
    return this._dimension;
  }
  get scrollsize() {
     return this.dimension * this.dimension / this.scrollvalue;
  }

  scrollvalue: number;
  private _dimension = 2000;

  constructor() { }


  onClick(evt) {
    console.log('boo');
    evt.stopPropagation();
    return false;
  }
}

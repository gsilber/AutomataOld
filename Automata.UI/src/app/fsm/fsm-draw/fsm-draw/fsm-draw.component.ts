import { MyInput } from './test';
import { Component, Input } from '@angular/core';
import { Fsm, FsmObject } from '../classes/Fsm';

@Component({
  selector: 'app-fsm-draw',
  templateUrl: './fsm-draw.component.html',
  styleUrls: ['./fsm-draw.component.css']
})
export class FsmDrawComponent {

  @Input() background = 'none';
  @Input() canvassize = 4000;
  get mode() { return this._mode; }
  set mode(val) { this._mode = val; if (val !== 'pointer') { this.selection = null; } }
  fsm: Fsm = new Fsm();
  selection: FsmObject = null;

  get zoomPercent() { return this._zoomPercent; }
  set zoomPercent(val) {
    if (val >= 50 && val <= 200) {
      this._zoomPercent = val;
    }
  }


  private _zoomPercent = 100;
  private _mode = 'pointer';
  constructor() { }

  // ctrlbar event handlers
  onCtrlbarZoom = (direction) => {
    const deltaPercent = 10 * direction * -1;
    this.zoomPercent -= deltaPercent;
    if (deltaPercent === 0) {
      this.zoomPercent = 100;
    }
  }

}

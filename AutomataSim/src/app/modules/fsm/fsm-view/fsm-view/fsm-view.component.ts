import { Component, Input, AfterViewInit } from '@angular/core';
import { FsmService, Fsm } from '../../fsm-common/fsm-common.module';

@Component({
  selector: 'app-fsm-view',
  templateUrl: './fsm-view.component.html',
  styleUrls: ['./fsm-view.component.css']
})
export class FsmViewComponent implements AfterViewInit {

  @Input() drawSize = 2000;
  @Input() zoomPercent = 100;
  @Input() fsmId = '_viewDefault';

  private _fsm: Fsm;

  // viewbox value for svg scaling
  public get zoomValue(): number {
    return this.drawSize * 2 / (this.zoomPercent / 100);
  }
  // size of containing scroll div
  public get scrollSize(): number {
    return this.drawSize * (this.zoomPercent / 100);
  }

  constructor(private _fsmSvc: FsmService) { }

  ngAfterViewInit() {
    this._fsm = this._fsmSvc.getFsm(this.fsmId);
  }

}

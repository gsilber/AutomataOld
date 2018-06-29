import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FsmService, Fsm, FsmState } from '../../fsm-common/fsm-common.module';

@Component({
  selector: 'app-fsm-view',
  templateUrl: './fsm-view.component.html',
  styleUrls: ['./fsm-view.component.css']
})
export class FsmViewComponent implements AfterViewInit {

  @Input() drawSize = 2000;
  @Input() zoomPercent = 100;
  @Input() fsmId = '_viewDefault';

  fsm: Fsm;

  get states(): FsmState[] {
    return (this.fsm ? this.fsm.getStates() : []);
  }
  // viewbox value for svg scaling
  public get zoomValue(): number {
    return this.drawSize * 2 / (this.zoomPercent / 100);
  }
  // size of containing scroll div
  public get scrollSize(): number {
    return this.drawSize * (this.zoomPercent / 100);
  }

  public get selectedState(): FsmState {
    // return this.fsm.getStates()[0];
    return null;
  }
  constructor(private _fsmSvc: FsmService, private _chgSvc: ChangeDetectorRef) { }

  ngAfterViewInit() {
    const json = '{"id": "' + this.fsmId + '", "stateData": [' +
      '{ "label": "q1", "uiData": { "x": "50", "y": "50", "transitions":[] }, "startState": true, "finalState": false },' +
      '{ "label": "q2", "uiData": { "x": "100", "y": "100", "transitions":[] }, "startState": false, "finalState": false },' +
      '{ "label": "q3", "uiData": { "x": "150", "y": "150", "transitions":[] }, "startState": false, "finalState": true },' +
      '{ "label": "q4", "uiData": { "x": "200", "y": "200", "transitions":[] }, "startState": true, "finalState": true }' +
      ']}';
    this.fsm = this._fsmSvc.fromJSON(
      json
    );
    this._chgSvc.detectChanges();
  }

}

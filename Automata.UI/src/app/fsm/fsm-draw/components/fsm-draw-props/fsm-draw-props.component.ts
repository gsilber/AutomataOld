import { FsmObject, FsmState, FsmTransition, StateTypes, FsmDataService } from './../../../fsm-core/services/fsm-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-props',
  templateUrl: './fsm-draw-props.component.html',
  styleUrls: ['./fsm-draw-props.component.css']
})
export class FsmDrawPropsComponent implements OnInit {

  @Input() set object(val) {
    this._object = val;
    if (this.state) {
      this.iname = this.state.name;
      this.itype = this.state.stateType;
    }
  }
  get object(): FsmObject { return this._object; }
  get validState(): boolean {
    if (!this.state) { return false; }
    return this._fsmSvc.validateLabel(this.state);
  }

  get start(): boolean { return this.state && (this.state.stateType === 'start' || this.state.stateType === 'startfinal'); }
  set start(val: boolean) { FsmDataService.setStateValue(this.state, StateTypes.START, !val); }
  get final() { return this.state && (this.state.stateType === 'final' || this.state.stateType === 'startfinal'); }
  set final(val: boolean) { FsmDataService.setStateValue(this.state, StateTypes.FINAL, !val); }
  private _object: FsmObject = null;

  get state(): FsmState {
    if (this._object && this._object.type === 'state') {
      return this._object as FsmState;
    }
    return null;
  }
  get transition(): FsmTransition {
    if (this._object && this._object.type === 'transition') {
      return this._object as FsmTransition;
    }
  }

  // state properties
  iname: string;
  itype: StateTypes;

  constructor(private _fsmSvc: FsmDataService) { }

  ngOnInit() {
  }

  updateStateEdit = () => {
    // this.state.name = this.name;
    // this.state.stateType = StateTypes.NORMAL;
    // if (this.start) {
    //   FsmDataService.toggleStateValue(this.state, StateTypes.START);
    // }
    // if (this.final) {
    //   FsmDataService.toggleStateValue(this.state, StateTypes.FINAL);
    // }
  }
  cancelStateEdit = () => {
    this.state.name = this.iname;
    this.state.stateType = this.itype;
  }
  public refresh = () => this.object = this.object;

  public cancel = () => {
    if (this.object && this.object.type === 'state') {
      this.cancelStateEdit();
    }
    if (this.object && this.object.type === 'transition') {
    }
  }
}

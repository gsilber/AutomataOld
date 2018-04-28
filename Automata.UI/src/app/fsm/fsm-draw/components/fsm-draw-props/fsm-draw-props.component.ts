import { FsmObject, FsmState, FsmTransition, StateTypes, FsmDataService } from './../../../fsm-core/services/fsm-data.service';
import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-fsm-draw-props',
  templateUrl: './fsm-draw-props.component.html',
  styleUrls: ['./fsm-draw-props.component.css']
})
export class FsmDrawPropsComponent implements AfterViewInit {
  // variables
  iname: string;
  itype: StateTypes;
  iCharAccepted: string;
  stateErrMsg = '';
  transitionErrMsg = '';

  // Private variables
  private _object: FsmObject = null;

  public get transitionCharacters(): string {
    return this._fsmSvc.getTransitionChars(this.transition);
  }
  public set transitionCharacters(val: string) {
    this._fsmSvc.setTransitionChars(this.transition, val);
  }
  // Input properties
  @Input() set object(val) {
    this._object = val;
    if (this.state) {
      this.iname = this.state.name;
      this.itype = this.state.stateType;
    }
    if (this.transition) {
      this.iCharAccepted = this.transitionCharacters;
    }
  }

  // Properties
  get object(): FsmObject { return this._object; }
  get validState(): boolean {
    if (!this.state) { return false; }
    this.stateErrMsg = this._fsmSvc.validateLabel(this.state);
    return this.stateErrMsg === '';
  }
  get validTransition(): boolean {
    if (!this.transition) { return false; }
    this.transitionErrMsg = this._fsmSvc.validateAcceptChars(this.transition);
    return this.transitionErrMsg === '';
  }
  get dirty(): boolean {
    if (this.state) {
      return this.state.name !== this.iname || this.state.stateType !== this.itype;
    }
    if (this.transition) {
      return this.transitionCharacters !== this.iCharAccepted;
    }
    return false;
  }
  get start(): boolean { return this.state && (this.state.stateType === 'start' || this.state.stateType === 'startfinal'); }
  set start(val: boolean) { FsmDataService.setStateValue(this.state, StateTypes.START, !val); }
  get final() { return this.state && (this.state.stateType === 'final' || this.state.stateType === 'startfinal'); }
  set final(val: boolean) { FsmDataService.setStateValue(this.state, StateTypes.FINAL, !val); }

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

  constructor(private _fsmSvc: FsmDataService, private _detect: ChangeDetectorRef) {}

  ngAfterViewInit(){
    setTimeout(_ => this._detect.detectChanges());
  }

  // state property page event handlers
  updateStateEdit = () => {
    this.iname = this.state.name;
    this.itype = this.state.stateType;
  }
  cancelStateEdit = () => {
    this.state.name = this.iname;
    this.state.stateType = this.itype;
  }
  deleteState = () => {
    this._fsmSvc.removeState(this.state);
    this.cancel();
    this.object = null;
  }

  // transition property page event handlers
  updateTransitionEdit = () => {
    this.iCharAccepted = this.transitionCharacters;
  }
  cancelTransitionEdit = () => {
    this.transitionCharacters = this.iCharAccepted;
  }
  deleteTransition = () => {
    this._fsmSvc.removeTransition(this.transition);
    this.cancel();
    this.object = null;
  }

  // Externally callable methods to refresh the page, or cancel the edit
  public refresh = () => this.object = this.object;

  public cancel = () => {
    if (this.object && this.object.type === 'state') {
      this.cancelStateEdit();
    }
    if (this.object && this.object.type === 'transition') {
      this.cancelTransitionEdit();
    }
    this.object = null;
  }
}

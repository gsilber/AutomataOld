import { Fsm } from './../../../fsm-core/classes/fsm';
import { FsmTransition } from './../../../fsm-core/classes/fsm-transition';
import { FsmState } from './../../../fsm-core/classes/fsm-state';
import { FsmObject } from './../../../fsm-core/classes/fsm-object';
import { FsmDataService } from './../../../fsm-core/services/fsm-data.service';
import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { StateTypes } from '../../../fsm-core/classes/fsm-state';

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
  userFsm: Fsm;
  workingFsm: Fsm;
  // Private variables
  private _object: FsmObject = null;

  public get transitionCharacters(): string {
    return this.transition.charactersAccepted;
  }
  public set transitionCharacters(val: string) {
    this.transition.charactersAccepted = val;
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
    this.stateErrMsg = this.workingFsm.stateLabelError(this.state);
    return this.stateErrMsg === '';
  }
  get validTransition(): boolean {
    if (!this.transition) { return false; }
    this.transitionErrMsg = this.transition.charactersError;
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
  get start(): boolean { return this.state && this.state.startState; }
  set start(val: boolean) { this.state.startState = val; }
  get final() { return this.state && this.state.finalState; }
  set final(val: boolean) { this.state.finalState = val; }

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

  constructor(private _fsmSvc: FsmDataService, private _detect: ChangeDetectorRef) {
    this.userFsm = _fsmSvc.userFsm;
    this.workingFsm = _fsmSvc.userFsm;
  }

  ngAfterViewInit() {
    setTimeout(_ => this._detect.detectChanges(), 1);
  }

  // state property page event handlers
  updateStateEdit = () => {
    this.iname = this.state.name;
    this.itype = this.state.stateType;
  }
  cancelStateEdit = () => {
    this.state.updateValues(this.iname, this.itype);
  }
  deleteState = () => {
    this.workingFsm.removeState(this.state);
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
    this.workingFsm.removeTransition(this.transition);
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

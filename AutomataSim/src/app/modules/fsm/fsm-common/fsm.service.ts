import { Injectable } from '@angular/core';
import { Fsm } from './classes/fsm';

@Injectable({
  providedIn: 'root'
})
export class FsmService {
  fsms: Map<string, Fsm> = new Map<string, Fsm>();

  constructor() { }
  getFsm(id = '__default'): Fsm {
    let fsm = this.fsms.get(id);
    if (fsm) {
      return fsm;
    }
    fsm = new Fsm(id);
    this.fsms.set(id, fsm);
    return fsm;
  }
  removeFsm(id): Fsm {
    const fsm = this.fsms.get(id);
    if (fsm) {
      this.fsms.delete(id);
    }
    return fsm;
  }
  fromJSON(json: string): Fsm {
    const jsonObj = JSON.parse(json);
    const fsm = this.getFsm(jsonObj.id);
    fsm.clear();
    jsonObj.stateData.forEach(element => fsm.addState(element));
    return fsm;
  }
}

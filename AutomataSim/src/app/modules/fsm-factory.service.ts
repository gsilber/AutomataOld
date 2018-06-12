import { Injectable } from '@angular/core';
import { Fsm } from './fsm/classes/Fsm';

@Injectable({
  providedIn: 'root'
})
export class FsmFactoryService {

  private fsmTable: Map<string, Fsm> = new Map<string, Fsm>();
  constructor() { }

  getFsm(id = 'default'): Fsm {
    const fsm = this.fsmTable.get(id) || new Fsm(id);
    this.fsmTable.set(id, fsm);
    return fsm;
  }

  removeFsm(id): Fsm {
    const fsm = this.fsmTable.get(id);
    this.fsmTable.delete(id);
    return fsm;
  }
}

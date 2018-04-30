import { FsmDataService } from './../../../fsm-core/services/fsm-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fsm-examples',
  templateUrl: './fsm-examples.component.html',
  styleUrls: ['./fsm-examples.component.css']
})
export class FsmExamplesComponent implements OnInit {
  examples = [
    {
      sigma: '{a,b}',
      description: 'A machine that accepts string with an even number of a\'s, where 0 is considered even.',
      // tslint:disable-next-line:max-line-length
      data: '[{"sourceState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"startfinal"},"destState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"startfinal"},"charactersAccepted":"b","characterMap":["b"],"rotation":17.25895549536503,"epsilon":false},{"sourceState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"normal"},"destState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"normal"},"charactersAccepted":"b","characterMap":["b"],"rotation":0.4340506321393889,"epsilon":false},{"sourceState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"startfinal"},"destState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"normal"},"charactersAccepted":"a","characterMap":["a"],"rotation":0,"epsilon":false},{"sourceState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"normal"},"destState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"startfinal"},"charactersAccepted":"a","characterMap":["a"],"rotation":107.5779117053398,"epsilon":false}]'
    },
    {
      sigma: '{a,b}',
      description: 'A machine that accepts string with an odd number of a\'s.',
      // tslint:disable-next-line:max-line-length
      data: '[{"sourceState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"start"},"destState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"start"},"charactersAccepted":"b","characterMap":["b"],"rotation":17.25895549536503,"epsilon":false},{"sourceState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"final"},"destState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"final"},"charactersAccepted":"b","characterMap":["b"],"rotation":0.4340506321393889,"epsilon":false},{"sourceState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"start"},"destState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"final"},"charactersAccepted":"a","characterMap":["a"],"rotation":0,"epsilon":false},{"sourceState":{"x":338.4453125,"y":349.04296875,"stateIndex":1,"name":"q1","stateType":"final"},"destState":{"x":103.44532012939453,"y":352.04296875,"stateIndex":0,"name":"q0","stateType":"start"},"charactersAccepted":"a","characterMap":["a"],"rotation":107.5779117053398,"epsilon":false}]'
    },
    {
      sigma: '{a,b}',
      description: 'The union of two deterministic FSM with Epsilon transitions.  Finds strings that start and end with at least two a\'s',
      // tslint:disable-next-line:max-line-length
      data: '[{"sourceState":{"x":196.4453125,"y":239.04296875,"stateIndex":1,"name":"q1","stateType":"normal"},"destState":{"x":342.4453125,"y":235.04296875,"stateIndex":2,"name":"q2","stateType":"normal"},"charactersAccepted":"a","characterMap":["a"],"rotation":0,"epsilon":false},{"sourceState":{"x":342.4453125,"y":235.04296875,"stateIndex":2,"name":"q2","stateType":"normal"},"destState":{"x":492.4453125,"y":230.04296875,"stateIndex":3,"name":"q3","stateType":"final"},"charactersAccepted":"a","characterMap":["a"],"rotation":0,"epsilon":false},{"sourceState":{"x":196.4453125,"y":239.04296875,"stateIndex":1,"name":"q1","stateType":"normal"},"destState":{"x":347.4453125,"y":94.04296875,"stateIndex":4,"name":"q4","stateType":"normal"},"charactersAccepted":"b","characterMap":["b"],"rotation":0,"epsilon":false},{"sourceState":{"x":342.4453125,"y":235.04296875,"stateIndex":2,"name":"q2","stateType":"normal"},"destState":{"x":347.4453125,"y":94.04296875,"stateIndex":4,"name":"q4","stateType":"normal"},"charactersAccepted":"b","characterMap":["b"],"rotation":-1.3574658147538865,"epsilon":false},{"sourceState":{"x":492.4453125,"y":230.04296875,"stateIndex":3,"name":"q3","stateType":"final"},"destState":{"x":492.4453125,"y":230.04296875,"stateIndex":3,"name":"q3","stateType":"final"},"charactersAccepted":"a,b","characterMap":["a","b"],"rotation":0,"epsilon":false},{"sourceState":{"x":347.4453125,"y":94.04296875,"stateIndex":4,"name":"q4","stateType":"normal"},"destState":{"x":347.4453125,"y":94.04296875,"stateIndex":4,"name":"q4","stateType":"normal"},"charactersAccepted":"a,b","characterMap":["a","b"],"rotation":173.65980825409008,"epsilon":false},{"sourceState":{"x":44.44532012939453,"y":354.04296875,"stateIndex":0,"name":"q0","stateType":"start"},"destState":{"x":196.4453125,"y":239.04296875,"stateIndex":1,"name":"q1","stateType":"normal"},"charactersAccepted":"","characterMap":[],"rotation":-54.67003024273084,"epsilon":true},{"sourceState":{"x":44.44532012939453,"y":354.04296875,"stateIndex":0,"name":"q0","stateType":"start"},"destState":{"x":189.4453125,"y":459.04296875,"stateIndex":5,"name":"q5","stateType":"normal"},"charactersAccepted":"","characterMap":[],"rotation":68.32001077894016,"epsilon":true},{"sourceState":{"x":189.4453125,"y":459.04296875,"stateIndex":5,"name":"q5","stateType":"normal"},"destState":{"x":189.4453125,"y":459.04296875,"stateIndex":5,"name":"q5","stateType":"normal"},"charactersAccepted":"b","characterMap":["b"],"rotation":15.751173663453017,"epsilon":false},{"sourceState":{"x":189.4453125,"y":459.04296875,"stateIndex":5,"name":"q5","stateType":"normal"},"destState":{"x":334.4453125,"y":455.04296875,"stateIndex":6,"name":"q6","stateType":"normal"},"charactersAccepted":"a","characterMap":["a"],"rotation":21.12024115117822,"epsilon":false},{"sourceState":{"x":334.4453125,"y":455.04296875,"stateIndex":6,"name":"q6","stateType":"normal"},"destState":{"x":493.4453125,"y":456.04296875,"stateIndex":7,"name":"q7","stateType":"final"},"charactersAccepted":"a","characterMap":["a"],"rotation":0,"epsilon":false},{"sourceState":{"x":493.4453125,"y":456.04296875,"stateIndex":7,"name":"q7","stateType":"final"},"destState":{"x":493.4453125,"y":456.04296875,"stateIndex":7,"name":"q7","stateType":"final"},"charactersAccepted":"a","characterMap":["a"],"rotation":0,"epsilon":false},{"sourceState":{"x":493.4453125,"y":456.04296875,"stateIndex":7,"name":"q7","stateType":"final"},"destState":{"x":189.4453125,"y":459.04296875,"stateIndex":5,"name":"q5","stateType":"normal"},"charactersAccepted":"b","characterMap":["b"],"rotation":114.05760423818768,"epsilon":false},{"sourceState":{"x":334.4453125,"y":455.04296875,"stateIndex":6,"name":"q6","stateType":"normal"},"destState":{"x":189.4453125,"y":459.04296875,"stateIndex":5,"name":"q5","stateType":"normal"},"charactersAccepted":"b","characterMap":["b"],"rotation":16.47924808975598,"epsilon":false}]'
    }
  ];
  get rawData() {
    return this.fsmSvc.toJson();
  }
  constructor(private fsmSvc: FsmDataService) { }

  ngOnInit() {
  }
  loadMachine(machDescription) {
    console.log(machDescription);
  }

}


import { FsmObject } from './../../../fsm-core/services/fsm-data.service';
import { FsmDrawTransitionComponent } from './../fsm-draw-transition/fsm-draw-transition.component';
import { FsmDrawStateComponent } from './../fsm-draw-state/fsm-draw-state.component';
import { Output, Component, QueryList, EventEmitter, ElementRef, ContentChildren, AfterViewInit, Renderer, Input } from '@angular/core';

// Helper classes
export class ChildMouseEvent {
  child: any;
  type: String;
  srcEvent: MouseEvent;
}

export class SurfaceMouseEvent {
  surfaceX: number;
  surfaceY: number;
  child: FsmObject;
  type: String;
  srcEvent: MouseEvent;
  constructor(srcEvent: MouseEvent, x: number, y: number, child: any, type: String) {
    this.srcEvent = srcEvent;
    this.surfaceX = x;
    this.surfaceY = y;
    this.child = child;
    this.type = type;
  }
}

// the surface component
@Component({
  selector: 'app-fsm-draw-surface',
  templateUrl: './fsm-draw-surface.component.html',
  styleUrls: ['./fsm-draw-surface.component.css']
})
export class FsmDrawSurfaceComponent implements AfterViewInit {

  // public variables
  public scrollvalue = 4000;

  // private variables
  private prevHooks: any[] = [];

  // input variables
  @Input() set zoomPercent(val) {
    this.scrollvalue = 4000 / (val / 100.0);
  }

  // output events
  @Output() surfaceclick: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacedblclick: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacecontextmenu: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemousedown: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseenter: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseleave: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemousemove: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseout: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseover: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();
  @Output() surfacemouseup: EventEmitter<SurfaceMouseEvent> = new EventEmitter<SurfaceMouseEvent>();

  // referenced child objects
  @ContentChildren(FsmDrawStateComponent) states: QueryList<FsmDrawStateComponent>;
  @ContentChildren(FsmDrawTransitionComponent) transitions: QueryList<FsmDrawTransitionComponent>;


  constructor(private _elementRef: ElementRef) { }

  // this method is going out and getting all the events from the child objects and subscribing to them to intercept
  ngAfterViewInit() {
    this.initEvents();
    this.states.changes.subscribe(_ => {
      this.initEvents();
    });
    this.transitions.changes.subscribe(_ => {
      this.initEvents();
    });
  }

  // private methods
  private initEvents = () => {
    this.prevHooks.forEach((subscription) => subscription.unsubscribe());

    this.prevHooks = [];
    this.states.forEach((element: FsmDrawStateComponent) => {
      this.prevHooks.push(element.stateclick.subscribe(obj => this.onChildClick(obj)));
      this.prevHooks.push(element.statedblclick.subscribe(obj => this.onChildDblClick(obj)));
      this.prevHooks.push(element.statecontextmenu.subscribe(obj => this.onChildContextMenu(obj)));
      this.prevHooks.push(element.statemousedown.subscribe(obj => this.onChildMouseDown(obj)));
      this.prevHooks.push(element.statemouseleave.subscribe(obj => this.onChildMouseLeave(obj)));
      this.prevHooks.push(element.statemousemove.subscribe(obj => this.onChildMouseMove(obj)));
      this.prevHooks.push(element.statemouseout.subscribe(obj => this.onChildMouseOut(obj)));
      this.prevHooks.push(element.statemouseover.subscribe(obj => this.onChildMouseOver(obj)));
      this.prevHooks.push(element.statemouseup.subscribe(obj => this.onChildMouseUp(obj)));
    });
    this.transitions.forEach((element: FsmDrawTransitionComponent) => {
      this.prevHooks.push(element.transitionclick.subscribe(obj => this.onChildClick(obj)));
      this.prevHooks.push(element.transitiondblclick.subscribe(obj => this.onChildDblClick(obj)));
      this.prevHooks.push(element.transitioncontextmenu.subscribe(obj => this.onChildContextMenu(obj)));
      this.prevHooks.push(element.transitionmousedown.subscribe(obj => this.onChildMouseDown(obj)));
      this.prevHooks.push(element.transitionmouseleave.subscribe(obj => this.onChildMouseLeave(obj)));
      this.prevHooks.push(element.transitionmousemove.subscribe(obj => this.onChildMouseMove(obj)));
      this.prevHooks.push(element.transitionmouseout.subscribe(obj => this.onChildMouseOut(obj)));
      this.prevHooks.push(element.transitionmouseover.subscribe(obj => this.onChildMouseOver(obj)));
      this.prevHooks.push(element.transitionmouseup.subscribe(obj => this.onChildMouseUp(obj)));
    });
  }

  // override all mouse events, attach old event and calculate svg coordinates
  onClick = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfaceclick);
  onDblClick = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacedblclick);
  onContextMenu = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacecontextmenu);
  onMouseDown = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemousedown);
  onMouseEnter = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseenter);
  onMouseLeave = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseleave);
  onMouseMove = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemousemove);
  onMouseOut = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseout);
  onMouseOver = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseover);
  onMouseUp = (evt: MouseEvent) => this.fireAugmentedMouseEvent(evt, this.surfacemouseup);

  // override all mouse events being bubbled from children, with the child and type attached
  onChildClick = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfaceclick, obj.child, obj.type);
  onChildDblClick = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacedblclick, obj.child, obj.type);
  onChildContextMenu = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacecontextmenu, obj.child, obj.type);
  onChildMouseDown = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacemousedown, obj.child, obj.type);
  onChildMouseEnter = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacemouseenter, obj.child, obj.type);
  onChildMouseLeave = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacemouseleave, obj.child, obj.type);
  onChildMouseMove = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacemousemove, obj.child, obj.type);
  onChildMouseOut = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacemouseout, obj.child, obj.type);
  onChildMouseOver = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacemouseover, obj.child, obj.type);
  onChildMouseUp = (obj: ChildMouseEvent) => this.fireAugmentedMouseEvent(obj.srcEvent, this.surfacemouseup, obj.child, obj.type);

  // Export methods
  public exportAsSvg() {
    const clone = this._elementRef.nativeElement.cloneNode(true);
    this.parseStyles(clone);
    // create a doctype
    const svgDocType = document.implementation.createDocumentType(
      'svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd');
    // a fresh svg document
    const svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
    // replace the documentElement with our clone
    svgDoc.replaceChild(clone, svgDoc.documentElement);
    // get the data
    return (new XMLSerializer()).serializeToString(svgDoc);
  }
  private parseStyles(svg) {
    const styleSheets = [];
    let i;
    // get the stylesheets of the document (ownerDocument in case svg is in <iframe> or <object>)
    const docStyles = svg.ownerDocument.styleSheets;
    // transform the live StyleSheetList to an array to avoid endless loop
    for (i = 0; i < docStyles.length; i++) {
      styleSheets.push(docStyles[i]);
    }
    if (!styleSheets.length) {
      return;
    }
    const defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    if (!defs.parentNode) {
      svg.insertBefore(defs, svg.firstElementChild);
    }
    svg.matches = svg.matches || svg.webkitMatchesSelector || svg.mozMatchesSelector || svg.msMatchesSelector || svg.oMatchesSelector;
    // iterate through all document's stylesheets
    for (i = 0; i < styleSheets.length; i++) {
      const currentStyle = styleSheets[i];
      let rules;
      try {
        rules = currentStyle.cssRules;
      } catch (e) {
        continue;
      }
      // create a new style element
      const style = document.createElement('style');
      // some stylesheets can't be accessed and will throw a security error
      const l = rules && rules.length;
      // iterate through each cssRules of this stylesheet
      for (let j = 0; j < l; j++) {
        // get the selector of this cssRules
        const selector = rules[j].selectorText;
        // probably an external stylesheet we can't access
        if (!selector) {
          continue;
        }
        // is it our svg node or one of its children ?
        if ((svg.matches && svg.matches(selector)) || svg.querySelector(selector)) {
          const cssText = rules[j].cssText;
          // append it to our <style> node
          style.innerHTML += cssText + '\n';
        }
      }
      // if we got some rules
      if (style.innerHTML) {
        // append the style node to the clone's defs
        defs.appendChild(style);
      }
    }
  }

  // Helper methods
  private fireAugmentedMouseEvent(
    evt: MouseEvent, emitter: EventEmitter<SurfaceMouseEvent>, child: any = null, type: String = 'surface'): boolean {
    const pt = this.clientToSurface(evt.clientX, evt.clientY);
    emitter.emit(new SurfaceMouseEvent(evt, pt.x, pt.y, child, type));
    evt.stopPropagation();
    return false;
  }
  private clientToSurface = (x: number, y: number) => {
    const pt = this._elementRef.nativeElement.children[0].createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(this._elementRef.nativeElement.children[0].getScreenCTM().inverse());
  }

}

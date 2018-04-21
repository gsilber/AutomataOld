import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  @Input() set open(val) {
    (val !== null ? this.openMenu(val.x, val.y) : this.closeMenu());
  }
  stateContextStyle: Object = {};
  constructor() { }

  ngOnInit() {
  }

  openMenu = (x: number, y: number) => this.stateContextStyle = { 'display': 'block', 'left': x + 'px', 'top': y + 'px' };
  closeMenu = () => this.stateContextStyle = { 'display': 'none' };
}

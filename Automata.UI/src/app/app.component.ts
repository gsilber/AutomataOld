import { MenuItem } from './reusable/header-menu/header-menu.module';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuData: MenuItem[] = [
    { title: 'Finite State Automata', routerLink: 'fsm', hasIcon: true, iconClass: 'fa-cogs' },
    { title: 'Push-Down Automata', routerLink: 'pda', hasIcon: true, iconClass: 'fa-arrow-circle-down' },
    { title: 'Turing Machines', routerLink: 'turing', hasIcon: true, iconClass: 'fa-calculator' }
  ];

  constructor() {
  }
}

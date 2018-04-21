import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuItemComponent } from './context-menu-item/context-menu-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ContextMenuComponent, ContextMenuItemComponent],
  declarations: [ContextMenuComponent, ContextMenuItemComponent]
})
export class ContextMenuModule { }

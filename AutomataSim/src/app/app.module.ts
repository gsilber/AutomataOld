import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FsmViewModule } from './modules/fsm/fsm-view/fsm-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FsmViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

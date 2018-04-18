import { FsmCoreModule } from './fsm/fsm-core/fsm-core.module';
import { FsmDrawModule } from './fsm/fsm-draw/fsm-draw.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FsmCoreModule,
    FsmDrawModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

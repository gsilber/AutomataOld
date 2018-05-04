import { TuringPageComponent } from './pages/turing-page/turing-page.component';
import { PdaPageComponent } from './pages/pda-page/pda-page.component';
import { FsmPageComponent } from './pages/fsm-page/fsm-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'fsm', pathMatch: 'full' },
  { path: 'fsm', component: FsmPageComponent },
  { path: 'pda', component: PdaPageComponent },
  { path: 'turing', component: TuringPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

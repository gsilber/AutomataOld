import { PdapageComponent } from './pages/pdapage/pdapage.component';
import { FsmpageComponent } from './pages/fsmpage/fsmpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TuringpageComponent } from './pages/turingpage/turingpage.component';


const routes: Routes = [
  { path: '', redirectTo: 'fsm', pathMatch: 'full' },
  { path: 'fsm', component: FsmpageComponent },
  { path: 'pda', component: PdapageComponent },
  { path: 'turing', component: TuringpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'text', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class publicRoutingModule { }

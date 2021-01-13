import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoFoundComponent } from './pages/no-found/no-found.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pages' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  // { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },

  { path: '404', component: NoFoundComponent },
  { path: '**', redirectTo: '404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

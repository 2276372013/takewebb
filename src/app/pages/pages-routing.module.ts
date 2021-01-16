import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPassWordComponent } from './forget-pass-word/forget-pass-word.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent} from "./register/register.component";
import { TestComponent } from './test/test.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'public', component: PublicComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'text', component: TestComponent },
  { path: 'forgot', component: ForgetPassWordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class pagesRoutingModule { }

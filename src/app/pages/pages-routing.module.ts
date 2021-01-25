import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPassWordComponent } from './forget-pass-word/forget-pass-word.component';
import { EditUserInformationComponent } from './public/edit-user-information/edit-user-information.component';
import { GoodsListComponent } from './public/goods-list/goods-list.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent} from "./register/register.component";
import { TestComponent } from './test/test.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgetPassWordComponent },

  {path: 'public', component: PublicComponent,
    children: [
      {path: '', component: TestComponent},
      {path: 'edituser', component: EditUserInformationComponent},
      {path: 'goodslist', component: GoodsListComponent},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class pagesRoutingModule { }

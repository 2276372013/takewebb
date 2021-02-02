import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPassWordComponent } from './forget-pass-word/forget-pass-word.component';
import { EditUserInformationComponent } from './public/edit-user-information/edit-user-information.component';
import { FriendsgoodslistComponent } from './public/friendsgoodslist/friendsgoodslist.component';
import { FriendslistComponent } from './public/friendslist/friendslist.component';
import { GoodslistComponent } from './public/goodslist/goodslist.component';
import { GoodsListOntimeComponent } from './public/goodsListOntime/goodsListOntime.component';
import { NewsComponent } from './public/news/news.component';
import { PublicComponent } from './public/public.component';
import { UseractionComponent } from './public/useraction/useraction.component';
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
      {path: 'edituser', component: EditUserInformationComponent,data: {breadcrumb: 'public'}},
      {path: 'goodslistontime', component: GoodsListOntimeComponent,data: {breadcrumb: 'goodslistontime'},},
      {path: 'goodslist', component: GoodslistComponent,data: {breadcrumb: 'goodslist'},},
      {path: 'friendsgoodslist', component: FriendsgoodslistComponent,data: {breadcrumb: 'friendsgoodslist'}},
      {path: 'friendslist', component: FriendslistComponent,data: {breadcrumb: 'friendslist'}},
      {path: 'news', component: NewsComponent,data: {breadcrumb: 'news'}},
      {path: 'useraction', component: UseractionComponent,data: {breadcrumb: 'useraction'}},
    ],
    data: {breadcrumb: 'public'}
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class pagesRoutingModule { }

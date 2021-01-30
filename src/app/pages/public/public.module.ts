import { TestComponent } from '../test/test.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
import { ShareModule } from '.././../share/share.module';
import { GoodsListOntimeComponent } from './goodsListOntime/goodsListOntime.component';
import { BeforeUpdataUserService } from '../../service/beforeUpdataUser.service';
import { GoodslistComponent } from './goodslist/goodslist.component';
import { FriendslistComponent } from './friendslist/friendslist.component';
import { FriendsgoodslistComponent } from './friendsgoodslist/friendsgoodslist.component';
@NgModule({
  declarations: [
    TestComponent,
    EditUserInformationComponent,
    GoodsListOntimeComponent,
    GoodslistComponent,
    FriendslistComponent,
    FriendsgoodslistComponent,
  ],

  imports: [
    ShareModule,
    NgxEchartsModule.forRoot({
      echarts,
    })
  ],
  exports:[
    ShareModule,
    TestComponent,
    EditUserInformationComponent,
    NgxEchartsModule,
    GoodsListOntimeComponent,
    GoodslistComponent,
    FriendslistComponent,
    FriendsgoodslistComponent,
  ],
  providers: [
    BeforeUpdataUserService,
  ]
})

export class PublicModule { }

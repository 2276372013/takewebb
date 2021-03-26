import { TestComponent } from '../test/test.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';
import { NgModule } from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
import { ShareModule } from '.././../share/share.module';
import { GoodsListOntimeComponent } from './goodsListOntime/goodsListOntime.component';
import { GoodslistComponent } from './goodslist/goodslist.component';
import { FriendslistComponent } from './friendslist/friendslist.component';
import { FriendsgoodslistComponent } from './friendsgoodslist/friendsgoodslist.component';
import { FriendsService } from 'src/app/service/Friends.service';
import { NewsService } from 'src/app/service/News.service';
import { ManagerService } from 'src/app/service/Manager.service';
import { UsersService } from 'src/app/service/Users.service';
import { GoodsService } from 'src/app/service/Goods.service';
import { NewsComponent } from './news/news.component';
import { UseractionComponent } from './useraction/useraction.component';
import { CRUDgoodsComponent } from './crudgoods/crudgoods.component';
import { NewslistComponent } from './newslist/newslist.component';
import { ManagerlistComponent } from './managerlist/managerlist.component';
import { GoodstypelistComponent } from './goodstypelist/goodstypelist.component';
import { GoodsplacelistComponent } from './goodsplacelist/goodsplacelist.component';
import { PhotoComponent } from './photo/photo.component';
import { TuchuangComponent } from './tuchuang/tuchuang.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
@NgModule({
  declarations: [
    TestComponent,
    EditUserInformationComponent,
    GoodsListOntimeComponent,
    GoodslistComponent,
    FriendslistComponent,
    FriendsgoodslistComponent,
    NewsComponent,
    UseractionComponent,
    CRUDgoodsComponent,
    NewslistComponent,
    ManagerlistComponent,
    GoodstypelistComponent,
    GoodsplacelistComponent,
    PhotoComponent,
    TuchuangComponent,
    AboutmeComponent,
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
    UsersService,
    GoodsService,
    FriendsService,
    ManagerService,
    NewsService
  ]
})

export class PublicModule { }

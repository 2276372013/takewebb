import { NgModule } from '@angular/core';
import { FriendnewsComponent } from './friendnews/friendnews.component';
import { ManagernewsComponent } from './managernews/managernews.component';
import { NewsService } from '../../../service/News.service';
import { pagesRoutingModule } from '../../pages-routing.module';
// import { newsRoutingModule } from './news-routing.module';
import { ShareModule } from '../../../share/share.module';
@NgModule({
  declarations: [
    FriendnewsComponent,
    ManagernewsComponent,
  ],
  imports: [
    pagesRoutingModule,
    ShareModule,
    // newsRoutingModule
  ],
  exports:[
    ManagernewsComponent,
    FriendnewsComponent,
    pagesRoutingModule
    // newsRoutingModule
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }

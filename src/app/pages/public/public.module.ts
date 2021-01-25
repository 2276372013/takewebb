import { TestComponent } from '../test/test.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
import { ShareModule } from '.././../share/share.module';
import { GoodsListComponent } from './goods-list/goods-list.component';
@NgModule({
  declarations: [
    TestComponent,
    EditUserInformationComponent,
    GoodsListComponent,
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
    GoodsListComponent
  ],
  providers: [
    // LoginService
  ]
})

export class PublicModule { }

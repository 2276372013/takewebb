import { TestComponent } from '../test/test.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
@NgModule({
  declarations: [
    TestComponent,
    EditUserInformationComponent
  ],

  imports: [
    NgxEchartsModule.forRoot({
      echarts,
    })
  ],
  exports:[
    TestComponent,
    EditUserInformationComponent,
    NgxEchartsModule,
  ],
  providers: [
    // LoginService
  ]
})

export class PublicModule { }

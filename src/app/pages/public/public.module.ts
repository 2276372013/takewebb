import { NgModule } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';
import { publicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    TestComponent,
    EditUserInformationComponent
  ],

  imports: [
    publicRoutingModule
  ],
  exports:[
    TestComponent
  ],
  providers: [
    // LoginService
  ]
})

export class PublicModule { }

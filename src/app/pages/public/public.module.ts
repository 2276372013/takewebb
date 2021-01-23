import { TestComponent } from '../test/test.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    TestComponent,
    EditUserInformationComponent
  ],

  imports: [
  ],
  exports:[
    TestComponent,
    EditUserInformationComponent,
  ],
  providers: [
    // LoginService
  ]
})

export class PublicModule { }

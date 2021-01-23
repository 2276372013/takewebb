import { NgModule } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';

@NgModule({
  declarations: [
    TestComponent,
    EditUserInformationComponent
  ],

  imports: [
  ],
  exports:[
    TestComponent,
    EditUserInformationComponent
  ],
  providers: [
    // LoginService
  ]
})

export class PublicModule { }

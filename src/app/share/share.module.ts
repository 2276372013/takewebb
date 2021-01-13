import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ngzorro 框架的引用
    NzButtonModule,
    NzGridModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzMenuModule,
    NzDividerModule,
    NzMessageModule,
    NzTypographyModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzBreadCrumbModule,
    NzEmptyModule,
    NzCardModule,
    NzStepsModule,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerModule,
    NzRadioModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzMenuModule,
    NzDividerModule,
    NzMessageModule,
    NzTypographyModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzBreadCrumbModule,
    NzEmptyModule,
    NzCardModule,
    NzStepsModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzDatePickerModule,
    NzRadioModule
  ]
})
export class ShareModule {
  constructor(){
  }
}

import { NgModule } from '@angular/core';
import { NoFoundComponent } from './no-found/no-found.component';
import { RegisterComponent } from './register/register.component';
import { PublicComponent } from './public/public.component';
import { IconsProviderModule } from '../share/icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { pagesRoutingModule } from './pages-routing.module';
import {CommonModule} from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShareModule } from '../share/share.module';
import { ForgetPassWordComponent } from './forget-pass-word/forget-pass-word.component';
import { PublicModule } from './public/public.module';
import { UsersService } from '../service/Users.service';
//
@NgModule({
  //declarations（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道。
  declarations: [
    RegisterComponent,
    PublicComponent,
    NoFoundComponent,
    WelcomeComponent,
    NoFoundComponent,
    ForgetPassWordComponent,
  ],
    //imports（导入表） —— 那些导出了本模块中的组件模板所需的类的其它模块。
  imports: [
    CommonModule,
    ShareModule,
    // BrowserModule,
    IconsProviderModule,
    HttpClientModule ,
    BrowserAnimationsModule ,
    pagesRoutingModule,
    PublicModule,
  ],
  //exports（导出表） —— 那些能在其它模块的组件模板中使用的可声明对象的子集。
  exports:[
    RegisterComponent,
    PublicComponent,
    NoFoundComponent,
    WelcomeComponent,
    ShareModule,
    NoFoundComponent,
  ],
//providers —— 本模块向全局服务中贡献的那些服务的创建器。 这些服务能被本应用中的任何部分使用。（你也可以在组件级别指定服务提供商，这通常是首选方式。）
  providers: [
    UsersService
  ]
})
//bootstrap —— 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。
export class PagesModule { }

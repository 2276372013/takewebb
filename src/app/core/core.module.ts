import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { IconsProviderModule } from '../share/icons-provider.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from '../pages/pages.module';
import { Interceptor } from '../httpInterceptors/Interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IconsProviderModule,
    PagesModule,
    AppRoutingModule
  ],
  exports:[
    PagesModule,
    AppRoutingModule,
  ],
  //启用token
  //import { Interceptor } from '../httpInterceptors/Interceptor';
  //import { HTTP_INTERCEPTORS } from '@angular/common/http';
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  // providers: [],
})
export class CoreModule {
  // 该代码保证CoreModule 只能被AppModule引入
  // 第一次coremodule是不存在的
  // @skipself 查找parentModule 这个类的时候跳过自身  去父级找CoreModule
  // 防止无限循环Module
  // @Optional() 当core 没找到的时候  给 parentModule 赋值一个NULL
  // ANGULAR 依赖注入里面 第一次加载的时候 没有加载coreModule 所以会抛出一个错误 所以要加第二个装饰器
  constructor(@SkipSelf() @Optional() parentModule: CoreModule){
    console.log('coreModule');
    if(parentModule){
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
}

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonInterceptor } from "./common.interceptors";

export const httpInterceptorProvides = [
              //  userclass  用哪个拦截器   multi true 表示服务可以有多个依赖(设置多个拦截器)
  {
   // provide : HTTP_INTERCEPTORS,useValue:new CommonInterceptor(), multi: true
   provide : HTTP_INTERCEPTORS,useClass:CommonInterceptor, multi: true
  },
]

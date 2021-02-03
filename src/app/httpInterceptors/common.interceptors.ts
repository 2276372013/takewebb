import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable()
export class CommonInterceptor implements HttpInterceptor{
  constructor(private router: Router){}
  // req 是我们发起的请求 next httpHandler
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.getAuthorizationToken();
    const httpOptions =authToken? {
      headers: new HttpHeaders({
        token: authToken
      })
    }:{};
    const authReq = req.clone(httpOptions);    
    return next.handle(authReq);
  }

  public getAuthorizationToken(){
    const token = localStorage.getItem("token");
    if(token){
      const jwt = token;
      return jwt;
    }else{
      return null;
    }
  }

}

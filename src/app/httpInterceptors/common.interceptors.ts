import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../service/authService";


@Injectable()
export class CommonInterceptor implements HttpInterceptor{
  constructor(private router: Router){}
  // req 是我们发起的请求 next httpHandler
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("this.auth.getAuthorizationToken()"+this.auth.getAuthorizationToken());

    const authToken = this.getAuthorizationToken();
    const httpOptions =authToken? {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    }:{};
    const authReq = req.clone(httpOptions);
    return next.handle(authReq);
  }

  public getAuthorizationToken(){
    console.log("token");
    const token = sessionStorage.getItem("token");
    console.log("token"+token);
    if(token){
      const jwt = token;
      return jwt;
    }else{
      return null;
    }
  }

}

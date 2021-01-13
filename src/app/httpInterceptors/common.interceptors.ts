import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../service/authService";


@Injectable()
export class CommonInterceptor implements HttpInterceptor{
  constructor(private router: Router, private auth: AuthService){}
  // req 是我们发起的请求 next httpHandler
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getAuthorizationToken();
    const httpOptions =authToken? {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    }:{};
    const authReq = req.clone(httpOptions);
    return next.handle(authReq);
  }

}

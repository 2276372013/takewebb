import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token1 = localStorage.setItem('token', '11');
        console.log(req);
        const token = localStorage.getItem('token');
        // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IjEyMzQ1NiIsImV4cCI6MTYxMTY0OTIyN30.ugqttx8hhcfia1chxtBRp6_Rysxeu8gnyJjaD3NikTQ";
        const authReq = req.clone({
            headers: req.headers.set('token', token)
        });
        return next.handle(authReq);
    }
}

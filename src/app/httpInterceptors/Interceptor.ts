import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token1 = localStorage.setItem('token', '11');
        const token = localStorage.getItem('token');
        const authReq = req.clone({
            headers: req.headers.set('token', token)
        });
        return next.handle(authReq);
    }
}

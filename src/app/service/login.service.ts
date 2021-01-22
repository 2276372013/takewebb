import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaceEntity/Entity/user.interface';

@Injectable()
export class LoginService{
  constructor(private httpClient: HttpClient) {}
  public login(user:User): Observable<any>{
    const body = {userName: user.userName, userPassword: user.userPassword};
    // window.sessionStorage.setItem('isLogin', 'true');
    return this.httpClient.post('http://localhost:8080/takeit/user/login', body);
  }
}

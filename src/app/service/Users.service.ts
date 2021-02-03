import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaceEntity/Entity/user.interface';
import { Msg } from '../interfaceEntity/Entity/Msg.interface';
import { map } from 'rxjs/internal/operators';
@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient) { }
  public beforeUpdataUser(): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/user/beforeUpdataUser', null);
  }
  public updataUser(user: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/user/updataUser', user);
  }
  public securityCode(Email: String) {
    return this.httpClient.post('http://localhost:8080/takeit/user/securityCode', Email);
  }

  public updatePassword(user: User) {
    return this.httpClient.post('http://localhost:8080/takeit/user/updataUserPassword', user);
  }
  public login(user: User): Observable<any> {
    const body = { userName: user.userName, userPassword: user.userPassword };
    // window.sessionStorage.setItem('isLogin', 'true');
    return this.httpClient.post('http://localhost:8080/takeit/user/login', body);
  }
  public register(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/user/insertUser', user);
  }
  public isLogin(): Observable<any> {
    // return window.localStorage.getItem('isLogin');
    return this.httpClient.post('http://localhost:8080/takeit/goods/okToken',null).pipe(map((res: { banners: Msg }) => res.banners));;
  }

}

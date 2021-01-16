import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaceEntity/Entity/user.interface';

@Injectable()
export class ForgetService {

  constructor(private httpClient: HttpClient) {}
  public securityCode(user: User) {
   console.log(user);
   return this.httpClient.post('http://localhost:8080/securityCode', user);
  }

  public updatePassword(user: User, code: string) {
   return this.httpClient.post('http://localhost:8080/updatePassword?code=' + code, user);
  }

}

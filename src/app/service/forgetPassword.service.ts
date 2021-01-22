import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaceEntity/Entity/user.interface';


@Injectable()
export class ForgetService {

  constructor(private httpClient: HttpClient) {}
  public securityCode(Email: String) {
   return this.httpClient.post('http://localhost:8080/takeit/user/securityCode', Email);
  }
  
  public updatePassword(user: User) {
   return this.httpClient.post('http://localhost:8080/takeit/user/updataUserPassword' , user);
  }

}

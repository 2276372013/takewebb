import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaceEntity/Entity/user.interface';

@Injectable()
export class RegisterService{
  constructor(private httpClient: HttpClient) {}
  public register(user:User): Observable<any>{
    console.log(user);
    return this.httpClient.post('http://localhost:8080/register', user);
  }
}

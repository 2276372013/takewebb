import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendsService {
  constructor(private httpClient: HttpClient) { }
  public beforeUpdataUser(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/takeit/user/beforeUpdataUser');
  }
}

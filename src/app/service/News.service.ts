import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsService {
  constructor(private httpClient: HttpClient) { }
  public beforeUpdataUser(): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/user/beforeUpdataUser', null);
  }
}

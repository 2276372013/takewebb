import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsService {
  constructor(private httpClient: HttpClient) { }
  public insertWechat(text:String): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/manager/insertWechat', text);
  }
  public handleShip(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/takeit/friends/handleShip');
  }
}

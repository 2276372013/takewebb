import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendsService {
  constructor(private httpClient: HttpClient) { }
  public findAllFriends(): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/friends/findAllFriends',null);
  }
  public findPhotoDescribe(userId:String): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/friends/findPhotoDescribe',userId);
  }
  public findUser(userName:String): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/friends/findUser',userName);
  }
  public addFriends(friendId:String,childName:String): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/friends/addFriends',{friendId:friendId,childName:childName});
  }
}

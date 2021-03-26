import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../interfaceEntity/Entity/Manager.interface';

@Injectable()
export class ManagerService {
  constructor(private httpClient: HttpClient) { }
  public findAllManager(manName?:String): Observable<any> {
    console.log(manName)
    if(manName){
       return this.httpClient.get('http://localhost:8080/takeit/manager/findAllManager?managerName='+manName);
    }
    return this.httpClient.get('http://localhost:8080/takeit/manager/findAllManager');
  }

  public insertManager(manager:Manager): Observable<any> {
    return this.httpClient.post('http://localhost:8080/takeit/manager/insertManager',manager);
  }

  public deleteManager(id:String): Observable<any> {
    return this.httpClient.delete('http://localhost:8080/takeit/manager/deleteManager/'+id);
  }
}

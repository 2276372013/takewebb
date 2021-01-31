import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Goods } from '../interfaceEntity/Entity/Goods.interface';

@Injectable()
export class GoodsService{
  constructor(private httpClient: HttpClient) {}
  public finallartist(): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/finallartist', null);
  }
  public insertGoods(goods:Goods): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/insertGoods', goods);
  }
}

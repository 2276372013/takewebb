import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Goods } from '../interfaceEntity/Entity/Goods.interface';

@Injectable()
export class GoodsService{
  constructor(private httpClient: HttpClient) {}
  public finallartist(): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/finallGoods', null);
  }
  public insertGoods(goods:Goods): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/insertGoods', goods);
  }
  public findAllGoodsPlace(): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/findallgoodsplace', null);
  }
  public findAllGoodsType(): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/findallgoodstype', null);
  }
  public downLoadExcel() {
    window.location.href = 'http://localhost:8080/takeit/goods/downLoadExcel';
  }
  public deleteGoods(goodsId:String[]): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/deleteGoods', goodsId);
  }
  public selectLikeGoods(goods:Goods): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/selectLikeGoods', goods);
  }
  public finallwilltime(): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/findGoodsWilltime', null);
  }
  public updatePassTime(goodsId:string,updateTime:Date): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/updatePassTime/'+goodsId+'/'+updateTime,null);
  }
}

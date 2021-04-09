import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Goods, GoodsPlace, GoodsType } from '../interfaceEntity/Entity/Goods.interface';
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
  public takeGoods(goodsId:String,updateTime:Date,goodsNum:number): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/takeGoods/'+goodsId+'/'+updateTime+'/'+goodsNum,null);
  }
  public updataGoods(goods:Goods): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/updataGoods', goods);
  }
  public findGoodsTypes(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/takeit/goods/findGoodsTypes');
  }
  public findGoodsPlaces(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/takeit/goods/findGoodsPlaces');
  }
  public updateGoodsPlaces(goodsPlace:GoodsPlace): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/updateGoodsPlaces', goodsPlace);
  }
  public updateGoodsTypes(goodsType:GoodsType): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/updateGoodsPlaces', goodsType);
  }
  public insertGoodsType(goodsType:GoodsType): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/insertGoodsType', goodsType);
  }
  public insertGoodsPlace(goodsPlace:GoodsPlace): Observable<any>{
    return this.httpClient.post('http://localhost:8080/takeit/goods/insertGoodsPlace', goodsPlace);
  }
}

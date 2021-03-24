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
  // public downLoadExcel(template: ExcelTemplate) {
    // window.location.href = 'http://localhost:8080/takeit/goods/download';
  //   const options = {
  //     responseType: 'blob' as 'json'
  // };
  // return this.http.post<Blob>(`/api/excel/export`, template, options)
  //     .pipe(retry(2), catchError(this.handleError.bind(this))).subscribe(rs => {
  //         if (rs) {
  //             const blob = new Blob([rs], {type: 'application/octet-stream'});
  //             saveAs(blob, `${template.name}.xlsx`);
  //         }
  //     });
  return this.httpClient.get('http://localhost:8080/takeit/goods/download');
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
}

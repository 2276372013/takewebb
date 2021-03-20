import { Component, OnInit,TemplateRef } from '@angular/core';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';
import { GoodsService } from '../../../service/Goods.service';
import { Goods } from '../../../interfaceEntity/Entity/Goods.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-goods-list-ontime',
  templateUrl: './goodsListOntime.component.html',
  styleUrls: ['./goodsListOntime.component.scss']
})
export class GoodsListOntimeComponent implements OnInit {
  constructor(private goodsService: GoodsService,private notification: NzNotificationService) {}

  editCache: { [key: string]: { edit: boolean; data: Goods } } = {};
  listOfData: Goods[] = [];
  goods: Goods[];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Goods[] = [];
  setOfCheckedId = new Set<String>();

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(index: string): void {
    this.editCache[index].edit = false;
  }

  saveEdit(id: string,index:string,template: TemplateRef<{}>): void {
    this.goodsService.updatePassTime(id,this.editCache[index].data.placeTime).subscribe((result: Msg) => {
      if (result.status === 200) {
        if(result.data == 1){
         this.getList()
         this.notification.template(template);
        }else{
        }
      } else {
      }
    });
    this.editCache[index].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach((item, index) => {
      this.editCache[index] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  getList(){
    this.goodsService.finallwilltime().subscribe((result: Msg) => {
      if (result.status === 200) {
        this.listOfData = result.data;
        this.listOfCurrentPageData = result.data;
        this.updateEditCache();
      } else {
      }
    });
  }
  ngOnInit(): void {
    this.getList()
  }
  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item =>
      this.setOfCheckedId.has(item.goodsId)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some(item =>
        this.setOfCheckedId.has(item.goodsId)
      ) && !this.checked;
  }
  onCurrentPageDataChange($event: Goods[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }
}

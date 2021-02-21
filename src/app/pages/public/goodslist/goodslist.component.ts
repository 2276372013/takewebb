import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { GoodsService } from 'src/app/service/Goods.service';
import { Goods } from '../../../interfaceEntity/Entity/Goods.interface';
interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-goodslist',
  templateUrl: './goodslist.component.html',
  styleUrls: ['./goodslist.component.scss']
})
export class GoodslistComponent implements OnInit {
  expandSet = new Set<number>();
  goodsList: Goods[];
  goodsType:String[];
  editgoodsType:String;
  goodsPlace:String[];
  editgoodsPlace:String;
  submitgoods: Goods;
  time:Date[];

  //
  array = ["../../../../assets/images/1.png", "../../../../assets/images/2.png", "../../../../assets/images/3.png"];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ItemData[] = [];
  setOfCheckedId = new Set<String>();
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ];
  //
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  constructor(private nzMessageService: NzMessageService, private goodsService: GoodsService) {
    this.submitgoods = new Goods();
    this.submitgoods.goodsPublic = true;
  }

  ngOnInit(): void {
    this.goodsService.finallartist().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) { 
          this.goodsList = result.data;
        } else {
        }
      }
    );
    this.goodsService.findAllGoodsPlace().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.goodsPlace = result.data;
        } else {
        }
      }
    );
    this.goodsService.findAllGoodsType().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.goodsType = result.data;
        } else {
        }
      }
    );
  }

  visible = false;
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: String, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  onCurrentPageDataChange($event: ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }
  onItemChecked(id: String, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }


  submitGoods() {
      this.submitgoods.placeTime = this.time[0];
      this.submitgoods.saveTimes = this.time[1];
      this.goodsService.insertGoods(this.submitgoods).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          alert("success");
        } else {
          console.log("1");
        }
      }
    )
  }


//***************************************************** */
  isVisibleTop = false;
  isVisibleMiddle = false;

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkTop(): void {
    console.log('点击了确定');
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  editGoodsType(data: string): void {
    this.submitgoods.goodsType = data;
  }

  editGoodsPlace(data: string): void {
    this.submitgoods.goodsPlace = data;
  }


}

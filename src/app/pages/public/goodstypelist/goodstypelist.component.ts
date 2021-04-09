import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GoodsType } from 'src/app/interfaceEntity/Entity/Goods.interface';
import { GoodsService } from 'src/app/service/Goods.service';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}
interface DataItem {
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-goodstypelist',
  templateUrl: './goodstypelist.component.html',
  styleUrls: ['./goodstypelist.component.scss']
})
export class GoodstypelistComponent implements OnInit {

  constructor(private message: NzMessageService, private nzMessageService: NzMessageService, private goodsService: GoodsService) {
    this.goodstype = new GoodsType();
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ItemData[] = [];
  listOfData: ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  goodsType: GoodsType[];
  goodstype: GoodsType;
  ngOnInit(): void {
    this.init();
    this.listOfData = new Array(200).fill(0).map((_, index) => {
      return {
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      };
    });
  }
  init() {
    this.goodsService.findGoodsTypes().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          // this.message.create('success', `更新成功！`);
          //刷新goods列表
          this.goodsType = result.data;
          console.log(this.goodsType)
        } else {
          // this.message.create('error', `更新失败了！`);
        }
      }
    );
  }
  searchValue = '';
  visible = false;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.goodstype.userId = window.localStorage.getItem('userid');
    this.goodsService.insertGoodsType(this.goodstype).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.message.create('success', `添加成功！`);
          console.log(result)
          this.init();
        } else {
          this.message.create('error', `添加失败了！`);
        }
        this.isVisible = false;
      }
    );
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

}

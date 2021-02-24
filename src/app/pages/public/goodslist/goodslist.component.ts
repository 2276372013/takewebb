import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { GoodsService } from 'src/app/service/Goods.service';
import { Goods } from '../../../interfaceEntity/Entity/Goods.interface';

@Component({
  selector: 'app-goodslist',
  templateUrl: './goodslist.component.html',
  styleUrls: ['./goodslist.component.scss']
})
export class GoodslistComponent implements OnInit {
  //变量定义
  isVisibleTop = false;
  isVisibleMiddle = false;
  expandSet = new Set<number>();
  goodsList: Goods[];
  goodsType: String[];
  editgoodsType: String;
  goodsPlace: String[];
  editgoodsPlace: String;
  submitgoods: Goods;
  time: Date[];
  array = ["../../../../assets/images/1.png", "../../../../assets/images/2.png", "../../../../assets/images/3.png"];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Goods[] = [];
  setOfCheckedId = new Set<String>();
  visible = false;
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ];
  passwordVisible = false;
  password?: string;
  value = "物品名"
  //依赖注入+init方法
  constructor(private nzMessageService: NzMessageService, private goodsService: GoodsService, private message: NzMessageService) {
    this.submitgoods = new Goods();
    this.submitgoods.goodsPublic = true;
  }

  ngOnInit(): void {
    //获取goods列表
    this.getGoodsList();
    //获取goods位置下拉
    this.goodsService.findAllGoodsPlace().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.goodsPlace = result.data;
        } else {
        }
      }
    );
    //获取goods种类下拉
    this.goodsService.findAllGoodsType().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.goodsType = result.data;
        } else {
        }
      }
    );
  }
  //下拉以及其他
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.goodsId, value));
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
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.goodsId));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.goodsId)) && !this.checked;
  }
  onCurrentPageDataChange($event: Goods[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }
  onItemChecked(id: String, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

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
  /*********************************************************************************************** */
  submitGoods() {
    this.submitgoods.placeTime = this.time[0];
    this.submitgoods.saveTimes = this.time[1];
    this.goodsService.insertGoods(this.submitgoods).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.message.create('success', `添加成功！`);
          this.visible = false;
          //刷新goods列表
          this.getGoodsList();
        } else {
          this.message.create('error', `添加失败了！`);
          this.visible = false;
        }
      }
    )
  }
  editGoodsType(data: string): void {
    this.submitgoods.goodsType = data;
  }

  editGoodsPlace(data: string): void {
    this.submitgoods.goodsPlace = data;
  }

  downLoadExcel() {
    this.goodsService.downLoadExcel();
  }

  deleteGoods() {
    const requestData = this.goodsList.filter(data => this.setOfCheckedId.has(data.goodsId));
    const deleteGoodsId = new Array();
    //for..of 方法遍历的值是数组中的value值
    //for..in遍历的值是数组的索引
    for (let value of requestData) {
      deleteGoodsId.push(value.goodsId);
    }
    if (deleteGoodsId.length != 0) {
      this.goodsService.deleteGoods(deleteGoodsId).subscribe(
        (result: Msg) => {
          if ((result.status === 200)) {
            this.message.create('success', `删除成功！`);
            //刷新goods列表
            this.getGoodsList();
          } else {
            this.message.create('error', `删除失败了！`);
          }
        }
      );
    } else {
      this.message.create('warning', `请勾选所删除物品`);
    }
  }

  getGoodsList() {
    this.goodsService.finallartist().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.goodsList = result.data;
        } else {
        }
      }
    );
  }

  date = null;
  isEnglish = false;


  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  radioValue = 'A';

  selectedValue = null;

}

import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';
import { GoodsService } from '../../../service/Goods.service';
import { Goods } from '../../../interfaceEntity/Entity/Goods.interface';
import endOfMonth from 'date-fns/endOfMonth';
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
  selectGoods: Goods;
  nullGoods: Goods;
  time: Date[];
  array = ["../../../../assets/images/1.png", "../../../../assets/images/2.png", "../../../../assets/images/3.png"];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Goods[] = [];
  setOfCheckedId = new Set<String>();
  visible = false;
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
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
    this.selectGoods = new Goods();
    this.nullGoods = new Goods();
    this.time = new Array();
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
  open(stype:String): void {

    if(stype=="add"){
      this.submitgoods =  this.nullGoods;
      this.visible = true;
    }else{
      const requestData = this.goodsList.filter(data => this.setOfCheckedId.has(data.goodsId));
      const GoodsIds = new Array();
      for (let value of requestData) {
        GoodsIds.push(value.goodsId);
      }
      if (GoodsIds.length == 1) {
        this.submitgoods = this.goodsList.filter(data => (data.goodsId==GoodsIds[0]))[0];
        this.time[0] = new Date(this.submitgoods.placeTime.toString().replace(/-/g, "/"));
        this.time[1] =  new Date(this.submitgoods.saveTimes.toString().replace(/-/g, "/"));
        this.visible = true;
        console.log(this.time)
      } else {
        this.message.create('warning', `请勾选一个物品呦👉`);
      }
    }

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

  handleOkMiddle(){
    this.goodsService.selectLikeGoods(this.selectGoods).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.goodsList = result.data;
          this.message.create('success', `查找成功！`);
        } else {
           console.log("\n %c 云上博客%c https://www.ni5.top \n", "color: #48dbfb; background: #1b1c1d; padding:5px 0;", "background: #fadfa3; padding:5px 0;") 
    console.log(this.selectGoods);   
        }
      }
    );
    this.isVisibleMiddle = false;

  }
}

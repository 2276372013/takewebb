import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';
import { GoodsService } from '../../../service/Goods.service';
import { Goods } from '../../../interfaceEntity/Entity/Goods.interface';
import endOfMonth from 'date-fns/endOfMonth';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';//数据导出导入所需要的依赖
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
  id: String;
  a: number;
  submitgoods: Goods;
  selectGoods: Goods;
  nullGoods: Goods;
  isVisible = false;
  takeNum: number;
  surplus: string;
  resultNum = false;
  stype: string;
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
  value = "物品名";
  //依赖注入+init方法
  constructor(private nzMessageService: NzMessageService, private goodsService: GoodsService, private message: NzMessageService, private http: HttpClient) {
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
  open(stype: string): void {
    this.stype = stype;
    if (stype == "add") {
      this.submitgoods = this.nullGoods;
      this.visible = true;
    } else {
      const requestData = this.goodsList.filter(data => this.setOfCheckedId.has(data.goodsId));
      const GoodsIds = new Array();
      for (let value of requestData) {
        GoodsIds.push(value.goodsId);
      }
      if (GoodsIds.length == 1) {
        this.submitgoods = this.goodsList.filter(data => (data.goodsId == GoodsIds[0]))[0];
        const date: Date[] = [new Date(this.submitgoods.placeTime.toString().replace(/-/g, "/")), new Date(this.submitgoods.saveTimes.toString().replace(/-/g, "/"))];
        this.time = date;
        this.visible = true;
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
  confirm(): void {
    this.nzMessageService.info('click confirm');
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
    this.selectGoods = new Goods();
    this.selectGoods.goodsType = '';
    this.selectGoods.goodsPlace = '';
    this.isVisibleMiddle = true;
  }

  handleOkTop(): void {
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  showModal(num: string, id: string): void {
    this.takeNum = this.a;
    this.surplus = num;
    this.id = id;
    this.isVisible = true;
    this.resultNum = false;
  }

  handleOk(): void {
    if (this.resultNum) {
    } else {
      this.goodsService.takeGoods(this.id, new Date(), this.takeNum).subscribe(
        (result: Msg) => {
          if ((result.status === 200)) {
            this.message.create('success', `取走成功！`);
            //刷新goods列表
            this.getGoodsList();
          } else {
            this.message.create('error', `失败了！`);
          }
        }
      )
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  checkNum(num: number) {
    if (((num - parseInt(this.surplus)) > 0) || (parseInt(this.surplus) <= 0)) {
      this.resultNum = true;
    } else {
      this.resultNum = false;
    }
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
  editGoodsType(data: String, who: String): void {
    if (who == 'submitgoods') {
      this.submitgoods.goodsType = data;
    } else {
      this.selectGoods.goodsType = data;
    }
  }

  editGoodsPlace(data: String, who: String): void {
    if (who == 'submitgoods') {
      this.submitgoods.goodsPlace = data;
    } else {
      this.selectGoods.goodsPlace = data;
    }
  }

  downLoadExcel() {
    const data = this.goodsList;
    // 新建空workbook，然后加入worksheet
    const ws = XLSX.utils.json_to_sheet(data)
    // 设置每列的列宽，10代表10个字符，注意中文占2个字符
    //  ws['!cols'] = [
    //    { wch: 10 },
    //    { wch: 30 },
    //    { wch: 25 }
    //  ]
    // 新建book
    const wb = XLSX.utils.book_new()
    // 生成xlsx文件(book,sheet数据,sheet命名)
    XLSX.utils.book_append_sheet(wb, ws, '数据详情')
    // 写文件(book,xlsx文件名称)
    XLSX.writeFile(wb, '列表详情.xlsx')
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

  editGoods() {
    this.submitgoods.placeTime = this.time[0];
    this.submitgoods.saveTimes = this.time[1];
    this.goodsService.updataGoods(this.submitgoods).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.message.create('success', `更改成功！`);
          this.getGoodsList();
          this.visible = false;
        } else {
        }
      }
    );
  }

  handleOkMiddle() {
    this.goodsService.selectLikeGoods(this.selectGoods).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.goodsList = result.data;
          this.message.create('success', `查找成功！`);
        } else {
          //console.log("\n %c 巴啦啦小魔仙%c https://www.baidu.com \n", "color: #48dbfb; background: #1b1c1d; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
        }
      }
    );
    this.isVisibleMiddle = false;

  }
}

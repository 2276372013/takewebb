import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';
import { GoodsService } from '../../../service/Goods.service';
import { Goods } from '../../../interfaceEntity/Entity/Goods.interface';
import endOfMonth from 'date-fns/endOfMonth';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../../service/ExcelService.service';
import { PERSONS, Person } from '../../../interfaceEntity/Entity/Person';
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
  a:number;
  submitgoods: Goods;
  selectGoods: Goods;
  nullGoods: Goods;
  isVisible = false;
  takeNum: number;
  surplus: string;
  resultNum = false;
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
  data = [
    ['1','a','aa'],
    ['2','b','bb'],
    ['3','c','cc']
  ]
  persons:Person[];
  constructor(private excelService: ExcelService,private nzMessageService: NzMessageService, private goodsService: GoodsService, private message: NzMessageService,private http:HttpClient) {
    this.submitgoods = new Goods();
    this.selectGoods = new Goods();
    this.nullGoods = new Goods();
    this.time = new Array();
    this.submitgoods.goodsPublic = true;
    this.persons = PERSONS;
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
  open(stype: String): void {

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
        this.time[0] = new Date(this.submitgoods.placeTime.toString().replace(/-/g, "/"));
        this.time[1] = new Date(this.submitgoods.saveTimes.toString().replace(/-/g, "/"));
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
    console.log('点击了确定');
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
    console.log(this.resultNum)
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
    if (((num - parseInt(this.surplus)) > 0)||(parseInt(this.surplus) <= 0)) {
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
    this.excelService.exportAsExcelFile("name",null, null, this.persons );
    // this.http.get('http://localhost:8080/takeit/goods/download').subscribe(data =>console.log(data))
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    // const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
 
    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');
 
    // console.log(wb)
    // /* save to file */
    // XLSX.writeFile(wb, 'SheetJS.xlsx');

      //  this.goodsService.downLoadExcel().subscribe(
      //   (result: Msg) => {
      //     if ((result.status === 200)) {
      //       this.message.create('success', `删除成功！`);
      //     } else {
      //       this.message.create('error', `删除失败了！`);
      //     }
      //   }
      // );
  //   if (!!this.listOfAllData) {
      // const template = new ExcelTemplate();
      // const header = ['参数名称', '用途', '参数类型', '单位', '可选值', '描述'];
      // template.name = '工艺参数表';
      // template.header = header.map(h => [h]);
      // // console.log()
      // template.data = this.listOfAllData.map(data => [
      //     data.name, this.transformUsage(data.usages).join(','), this.transformType(data.type),
      //     data.unit, data.valueCandicatesStr, data.comments]);
  //     console.log('export excel template: %o', template);
      // this.goodsService.downLoadExcel(template);
  // }
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

  handleOkMiddle() {
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

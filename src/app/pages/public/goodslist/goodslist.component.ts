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
  //
aabb= true;
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
  listOfData = [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      expand: false,
      address: 'New York No',
      description: 'My name is John Brown, I am 32 years old'
    },
    {
      id: 2,
      name: 'Jim Green',
      age: 42,
      expand: false,
      address: 'London No',
      description: 'My name is Jim Green, I am 42 years old'
    },
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: '1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old'
    }
    ,
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: '1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old'
    }
    ,
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'Lake Park',
      description: 'My name is Joe Black, I am 32 years old'
    }
    ,
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'SidneyPark',
      description: 'My name is Joe Black, I am 32 years old'
    }
    ,
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'Sidney Park',
      description: 'My name is Joe Black, I am 32 years old'
    }
  ];

  
  constructor(private nzMessageService: NzMessageService, private goodsService: GoodsService) { }

  ngOnInit(): void {
    this.goodsService.finallartist().subscribe(
      (result: Msg) => {
        if ((result.status === 200)){
         this.goodsList = result.data;
         console.log(this.goodsList);
        }else{
          console.log("1");
        }
      }
    )
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

}

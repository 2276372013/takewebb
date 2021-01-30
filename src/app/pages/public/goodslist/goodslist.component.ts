import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-goodslist',
  templateUrl: './goodslist.component.html',
  styleUrls: ['./goodslist.component.scss']
})
export class GoodslistComponent implements OnInit {
  expandSet = new Set<number>();
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

  
  constructor(private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
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

}

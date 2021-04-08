import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { UsersService } from 'src/app/service/Users.service';
import * as OSS from 'ali-oss'

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
  selector: 'app-goodsplacelist',
  templateUrl: './goodsplacelist.component.html',
  styleUrls: ['./goodsplacelist.component.scss']
})
export class GoodsplacelistComponent implements OnInit {

  constructor(private message: NzMessageService, private nzMessageService: NzMessageService, private usersService: UsersService) { }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
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

  ngOnInit(): void {
    this.listOfData = new Array(200).fill(0).map((_, index) => {
      return {
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      };
    });
  }

  searchValue = '';
  visible = false;
  listOfData1: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData1];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData1.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
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

  inputValue: string = 'my site';

  fileEvent(fileInput: any) {
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI4GDqNLNrM9iBJXFngX7h',
      accessKeySecret: 'HNGUCQGMUUjDLa0tr0lYxAZVW2O1dg',
      bucket: 'haoliang-bucket',
    });
    var base64Data;
    const reader2 = new FileReader()
    const fileName = fileInput.target.files[0].name;
    reader2.readAsDataURL(fileInput.target.files[0]);
    reader2.onload = () => {
      base64Data = reader2.result;
      // console.log(reader2.result); //获取到base64格式图片

      var byteString;
      if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);//base64 解码
      else {
        byteString = unescape(base64Data.split(',')[1]);
      }
      var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png

      // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
      // var ia = new Uint8Array(arrayBuffer);//创建视图
      var ia = new Uint8Array(byteString.length);//创建视图
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ia], {
        type: mimeString
      });

      let userNam = 'takeit/userPhoto/' + window.localStorage.getItem('username') + '/' + fileName + '.png';

      client.put(userNam, blob).then(r1 => {
        this.usersService.photoInsert(r1.url).subscribe(
          (result: Msg) => {
            if ((result.status === 200)) {
              this.message.create('success', `更新成功！`);
              //刷新goods列表
            } else {
              this.message.create('error', `更新失败了！`);
            }
          }
        );
        // return client.get(userNam);
      }).then(r2 => {
        // console.log('get success: %j', r2);
      }).catch(err => {
        // console.error('error: %j', err);
      });
    };

  }
}

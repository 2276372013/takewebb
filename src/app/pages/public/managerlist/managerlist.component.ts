import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/service/Manager.service';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';
import { Manager } from '../../../interfaceEntity/Entity/Manager.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
interface DataItem {
  id: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-managerlist',
  templateUrl: './managerlist.component.html',
  styleUrls: ['./managerlist.component.scss']
})
export class ManagerlistComponent implements OnInit {

  constructor(private managerService: ManagerService,private message: NzMessageService) {
    this.manager = new Manager()
  }

  managers: Manager[];
  manager: Manager;

  ngOnInit(): void {
    this.getManagerList();
  }

  searchValue = '';
  visible = false;

  reset(): void {
    this.searchValue = '';
  }

  search(manName:String): void {
    this.managerService.findAllManager(manName).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.managers = result.data;
        } else {
          this.message.create('warning', `系统错误！`);
        }
      }
    );
    this.visible = false;
  }


  isVisible = false;

  showModal(): void {
    const man = new Manager();
    this.manager = man;
    this.isVisible = true;
  }

  handleOk(): void {
    this.managerService.insertManager(this.manager).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          if(result.data == 1){
            this.message.create('success', `系统管理员添加成功！`);
            this.getManagerList();
          }else{
            this.message.create('error', `系统管理员添加失败！`);
          }
        } else {
          this.message.create('warning', `系统错误！`);
        }
      }
    );
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  getManagerList(){
    this.managerService.findAllManager().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.managers = result.data;
        } else {
          this.message.create('warning', `系统错误！`);
        }
      }
    );
  }

  cancel(): void {
    this.message.info('取消成功');
  }

  confirm(id:String): void {
    this.managerService.deleteManager(id).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          if ((result.data === 1)) {
            this.message.create('error', `删除成功`);
            this.getManagerList();
          } else {
            this.message.create('error', `删除失败`);
          }
        } else {
          this.message.create('warning', `系统错误！`);
        }
      }
    );
  }

}

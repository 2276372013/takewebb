import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../service/News.service';
import { Msg } from '../../../../interfaceEntity/Entity/Msg.interface';
import { Friends } from '../../../../interfaceEntity/Entity/Friends.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-friendnews',
  templateUrl: './friendnews.component.html',
  styleUrls: ['./friendnews.component.scss']
})
export class FriendnewsComponent implements OnInit {

  constructor(private newsService: NewsService, private message: NzMessageService) { }
  handleShipList: Friends[];

  ngOnInit(): void {
    this.handleShip();
  }

  returnADD(result: String, friendsId: String, userName:String) {
    this.newsService.returnAdd(result, friendsId,userName).subscribe((result: Msg) => {
      if (result.status === 200) {
        this.message.create('success', `操作成功`);
        this.handleShip();
      } else {
      }
    });
  }

  handleShip() {
    this.newsService.handleShip().subscribe((result: Msg) => {
      if (result.status === 200) {
        this.handleShipList = result.data;
      } else {
      }
    });
  }
}

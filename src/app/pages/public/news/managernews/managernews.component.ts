import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../service/News.service';
import { Msg } from '../../../../interfaceEntity/Entity/Msg.interface';
import { Wechat } from '../../../../interfaceEntity/Entity/Wechat.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-managernews',
  templateUrl: './managernews.component.html',
  styleUrls: ['./managernews.component.scss']
})
export class ManagernewsComponent implements OnInit {

  constructor(private newsService: NewsService, private message: NzMessageService) { }
  handleShipList: Wechat[];

  ngOnInit(): void {
    this.newsService.findManagerNews().subscribe((result: Msg) => {
      if (result.status === 200) {
        this.handleShipList = result.data;
        console.log(this.handleShipList)
      } else {
      }
    });
  }
}


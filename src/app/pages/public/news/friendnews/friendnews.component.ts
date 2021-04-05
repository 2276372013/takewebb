import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../service/News.service';
import { Msg } from '../../../../interfaceEntity/Entity/Msg.interface';
import { Friends } from '../../../../interfaceEntity/Entity/Friends.interface';

@Component({
  selector: 'app-friendnews',
  templateUrl: './friendnews.component.html',
  styleUrls: ['./friendnews.component.scss']
})
export class FriendnewsComponent implements OnInit {

  constructor(private newsService:NewsService) { }
  handleShipList: Friends[];

  ngOnInit(): void {
    this.newsService.handleShip().subscribe((result: Msg) => {
      if (result.status === 200) {
        // this.handleShipList = result.data;
        console.log(result.data)
      } else {
      }
    });
  }

}

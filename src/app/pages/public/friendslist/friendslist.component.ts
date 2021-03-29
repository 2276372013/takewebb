import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../interfaceEntity/Entity/user.interface';
import { FriendsService } from '../../../service/Friends.service';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.scss']
})
export class FriendslistComponent implements OnInit {

  constructor(private friendsService: FriendsService) {}
  offsetTop = 10;
  visible = false;
  childrenVisible = false;
  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];
  friendsList:User[];
  
  ngOnInit(): void {
    this.friendsService.findAllFriends().subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.friendsList = result.data;
          console.log(this.friendsList)
        } else {
        }
      }
    );
  }

  panels = [
    {
      name: ' <input nz-input placeholder="borderless" nzBorderless />',
      childPannel: [
        {
          active: false,
          disabled: true,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      name: 'This is panel header 2'
    },
    {
      name: 'This is panel header 3'
    }
  ];

  setOffsetTop(): void {
    this.offsetTop += 10;
    console.log("Hello")
  }

  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }
}

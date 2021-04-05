import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../interfaceEntity/Entity/user.interface';
import { FriendsService } from '../../../service/Friends.service';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.scss'],
})
export class FriendslistComponent implements OnInit {
  constructor(
    private friendsService: FriendsService,
    private message: NzMessageService
  ) {}
  offsetTop = 10;
  visible = false;
  childrenVisible = false;
  vegetables = [
    'asparagus',
    'bamboo',
    'potato',
    'carrot',
    'cilantro',
    'potato',
    'eggplant',
  ];
  friendsList: User[];
  userDescribe = '';
  userPhoto = '';
  //EventEmitter 属性
  voted = new EventEmitter<boolean>();
  userName = '';
  show = false;
  addFriendsId = '';
  str = '';
  childNa = '';

  ngOnInit(): void {
    this.friendsService.findAllFriends().subscribe((result: Msg) => {
      if (result.status === 200) {
        this.friendsList = result.data.users;
      } else {
      }
    });
  }

  Hello(e: MouseEvent, userId: String) {
    console.log(userId);
    this.findPhotoDescribe(userId);
  }

  findPhotoDescribe(userId: String) {
    this.friendsService.findPhotoDescribe(userId).subscribe((result: Msg) => {
      if (result.status === 200) {
        this.userDescribe = result.data.userDescribe;
        this.userPhoto = result.data.userPhoto;
      } else {
      }
    });
  }

  findUser() {
    this.show = false;
    this.friendsService.findUser(this.userName).subscribe((result: Msg) => {
      if (result.status === 200) {
        if (result.data) {
          this.friendsService
            .findPhotoDescribe(result.data.userId)
            .subscribe((result: Msg) => {
              if (result.data != null) {
                this.addFriendsId = result.data.userId;
                this.userPhoto = result.data.userPhoto;
                this.userDescribe = result.data.userDescribe;
                this.show = true;
                this.str = this.userName;
                this.userName = '';
              } else {
              }
            });
        } else {
          this.message.create('warning', `根据用户名没有找到该用户`);
        }
      } else {
      }
    });
  }

  panels = [
    {
      name: ' <input nz-input placeholder="borderless" nzBorderless />',
      childPannel: [
        {
          active: false,
          disabled: true,
          name: 'This is panel header 1-1',
        },
      ],
    },
    {
      name: 'This is panel header 2',
    },
    {
      name: 'This is panel header 3',
    },
  ];

  setOffsetTop(): void {
    this.offsetTop += 10;
    console.log('Hello');
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

  addFriends() {
    if (this.childNa == '') {
      this.friendsService
        .addFriends(this.addFriendsId,this.str)
        .subscribe((result: Msg) => {
          if (result.status === 200) {
            console.log(result);
          } else {
          }
        });
    } else {
      this.friendsService
        .addFriends(this.addFriendsId,this.childNa)
        .subscribe((result: Msg) => {
          if (result.status === 200) {
            console.log(result);
          } else {
          }
        });
    }
  }
}

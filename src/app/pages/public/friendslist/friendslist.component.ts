import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.scss']
})
export class FriendslistComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  panels = [
    {
      active: false,
      disabled: false,
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
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
  
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managernews',
  templateUrl: './managernews.component.html',
  styleUrls: ['./managernews.component.scss']
})
export class ManagernewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
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
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private router: Router) { }

  navigate(type:String){
    this.router.navigate(['public/news/'+type]);
  }

  ngOnInit(): void {
  }

  // panels = [
  //   {
  //     active: true,
  //     disabled: false,
  //     name: 'This is panel header 1',
  //     childPannel: [
  //       {
  //         active: false,
  //         disabled: true,
  //         name: 'This is panel header 1-1'
  //       }
  //     ]
  //   },
  //   {
  //     active: false,
  //     disabled: true,
  //     name: 'This is panel header 2'
  //   },
  //   {
  //     active: false,
  //     disabled: false,
  //     name: 'This is panel header 3'
  //   }
  // ];
}

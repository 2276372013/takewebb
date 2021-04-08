import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  isCollapsed = true;
  username :String;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
  }

  navigate(type:String){
    this.router.navigate(['public/'+type]);
  }
  notify(): void {
  }

}

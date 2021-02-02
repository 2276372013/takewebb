import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(type:String){
    console.log(this.router.url);
    this.router.navigate(['public/'+type]);
  }

}

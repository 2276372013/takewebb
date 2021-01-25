import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  isCollapsed = true;
  
  constructor(private loginService:LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate(['public/edituser']);
  }

  navigate1(){
    this.router.navigate(['public/goodslist']);
  }
}

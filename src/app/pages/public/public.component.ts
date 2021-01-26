import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  isCollapsed = true;

  constructor(private loginService:LoginService,private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  navigate(type:String){
    this.router.navigate(['public/'+type]);
  }

}

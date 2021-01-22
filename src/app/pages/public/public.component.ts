import { Component, OnInit } from '@angular/core';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  isCollapsed = false;
  
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
}

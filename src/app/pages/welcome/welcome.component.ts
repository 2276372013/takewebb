import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { Msg } from '../../interfaceEntity/Entity/Msg.interface';
import { User } from '../../interfaceEntity/Entity/user.interface';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public userId: number;
  public userName: string;
  public userPassword: string;
  public user:User;
  public num = 111111;
  constructor(private router: Router, private loginService: LoginService) {
    this.user = new User();
  }
  
  public login() {
    this.user.userName = this.num.toString();

    this.loginService.login(this.user).subscribe(
      (result: Msg) => {
        console.log(result);
        if ((result.status === 200) && (result.data === true)){
          this.router.navigate(['public']);
        }else{
          alert("用户名或密码错误");
        }
      }
    )
  }

  ngOnInit(): void {}

  register(){
    this.router.navigate(['register']);
  }
  
}

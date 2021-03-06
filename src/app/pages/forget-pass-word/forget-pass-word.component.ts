import { Component, OnInit,TemplateRef } from '@angular/core';
import { User } from 'src/app/interfaceEntity/Entity/user.interface';
import { Router } from '@angular/router';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/service/Users.service';
@Component({
  selector: 'app-forget-pass-word',
  templateUrl: './forget-pass-word.component.html',
  styleUrls: ['./forget-pass-word.component.scss']
})
export class ForgetPassWordComponent implements OnInit {
  passwordVisible = false;
  checkPassword?: string;
  isLoadingOne = false;
  user:User;
  result:boolean;
  a="";
  buttonDisplay:boolean;
  // 验证码倒计时
  verifyCode: any = {
    verifyCodeTips: '获取验证码',
    countdown: 60,
    disable: true,
  };

  constructor( private router: Router,private usersService: UsersService,private notification: NzNotificationService) { 
    this.user = new User(); 
  }

  registerSuccess(){
    this.notification.remove();
    this.router.navigate(['welcome']);
  }

  matchPassword(Password: string) {
    if (this.user.userPassword === Password) {
      this.a = "success";
      this.result = false;
      // this.notification.template(template);
    } else {
      this.a = "error";
      this.result = true;
    }
  }

  resetForm(e: MouseEvent): void {
    location.reload();
  }

  ngOnInit(): void {
    
  }

  back(){
    this.router.navigate(['welcome']);
  }
  public securityCode() {
    this.verifyCode.disable = false;
    this.settime();
    this.usersService.securityCode(this.user.userEmail).subscribe((data: Msg) => {
      this.verifyCode.countdown = 1;
    });
  }
    // 倒计时
    settime() {
      if (this.verifyCode.countdown == 1) {
        this.verifyCode.countdown = 60;
        this.verifyCode.verifyCodeTips = '获取验证码';
        this.verifyCode.disable = true;
        return;
      } else {
        this.verifyCode.countdown--;
      }
  
      this.verifyCode.verifyCodeTips =
        '重新获取(' + this.verifyCode.countdown + ')';
      setTimeout(() => {
        this.verifyCode.verifyCodeTips =
          '重新获取(' + this.verifyCode.countdown + ')';
        this.settime();
      }, 1000);
    }

    loadOne(template: TemplateRef<any>): void {
      this.isLoadingOne = true;
  
      this.usersService.updatePassword(this.user).subscribe(
        (result: Msg) => {
          if ((result.data === 1)){
           this.buttonDisplay = true;
            this.notification.template(template);
          }else{
            this.buttonDisplay = false;
            this.isLoadingOne = false;
            this.notification.template(template);
          }
        }
      )
    }
}

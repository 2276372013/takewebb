import { Component, OnInit,TemplateRef,ViewChild  } from '@angular/core';
import { User } from 'src/app/interfaceEntity/Entity/user.interface';
// import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { config } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userBirth = null;
  isLoadingOne = false;
  userSex = '1';
  user:User;
  reuser:User;
  checkPassword: string;
  result:boolean;
  a="";
  buttonDisplay:boolean;

  constructor( private router: Router,private registerService: RegisterService,private notification: NzNotificationService) { 
    this.user = new User(); 
    this.reuser = new User(); 
  }

  loadOne(template: TemplateRef<any>): void {
    this.isLoadingOne = true;

    this.registerService.register(this.user).subscribe(
      (result: Msg) => {
        console.log(result);
        if ((result.status === 200) && (result.data === 1)){
         this.buttonDisplay = true;
          this.notification.template(template);
        }else{
          this.buttonDisplay = false;
          this.isLoadingOne = false;
          this.notification.template(template);
        }
      }
    )
    // 自执行函数
    // setTimeout(() => {
    // }, 5000);
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
}

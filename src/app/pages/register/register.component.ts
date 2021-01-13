import { Component, OnInit,ViewChild  } from '@angular/core';
import { User } from 'src/app/interfaceEntity/Entity/user.interface';
// import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';

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
  @ViewChild('rePassword') rePassword:any;

  constructor( private router: Router,private registerService: RegisterService) { 
    this.user = new User(); 
    this.reuser = new User(); 
    // this.validateForm = this.fb.group({});
  }

  loadOne(): void {
    this.isLoadingOne = true;

    this.registerService.register(this.user).subscribe(
      (result: Msg) => {
        if ((result.status === 200) && (result.data === 1)){
          alert("注册成功了");
          this.router.navigate(['welcome']);

        }else{
          alert("注册失败了");
          this.isLoadingOne = false;
        }
      }
    )
    // 自执行函数
    // setTimeout(() => {
    // }, 5000);
  }

  matchPassword(Password: string) {
    if (this.user.userPassword === Password) {
      this.a = "success";
      this.result = false;
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
}

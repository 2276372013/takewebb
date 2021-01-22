import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { Msg } from '../../interfaceEntity/Entity/Msg.interface';
import { User } from '../../interfaceEntity/Entity/user.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public userId: number;
  public userName: string;
  public userPassword: string;
  public user: User;
  buttonDisplay: boolean;
  constructor(private router: Router, private loginService: LoginService, private notification: NzNotificationService) {
    this.user = new User();
  }

  public login(template: TemplateRef<any>) {

    this.loginService.login(this.user).subscribe(
      (result: Msg) => {
        if ((result.status === 200) && (result.data === true)) {
          this.buttonDisplay = true;
          this.notification.template(template);
          sessionStorage.setItem('token', result.token);
          this.router.navigate(['public']);
        } else {
          this.buttonDisplay = false;
          this.notification.template(template);
        }
      }
    )
  }

  ngOnInit(): void { }

  register() {
    this.router.navigate(['register']);
  }

  resetForm(e: MouseEvent): void {
    location.reload();
  }

  forgot(){
    this.router.navigate(['forgot']);
  }


}

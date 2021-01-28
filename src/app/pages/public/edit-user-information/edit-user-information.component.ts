import { Component, OnInit, TemplateRef } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { BeforeUpdataUserService } from 'src/app/service/beforeUpdataUser.service';
import { DatePipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-edit-user-information',
  templateUrl: './edit-user-information.component.html',
  styleUrls: ['./edit-user-information.component.scss']
})
export class EditUserInformationComponent implements OnInit {

  validateForm: FormGroup;
  buttonDisplay:boolean;

  submitForm(value: { userName: string; userEmail: string; userPassword: string;userSex: string; userBirth: Date; userCall: string },template: TemplateRef<any>): void {
    for (const key in this.validateForm.controls) {
      //脏校验
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.beforeUpdataUser.updataUser(value).subscribe(
      (result: Msg) => {
        if ((result.status === 200) && (result.data === 1)){
          this.buttonDisplay = true;
          this.notification.template(template);
        }else{
          this.buttonDisplay = false;
          this.notification.template(template);
        }
      }
    );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {};
    } else if (control.value !== this.validateForm.controls.userPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder, private beforeUpdataUser: BeforeUpdataUserService,private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      userName: [{ value: '', disabled: true }],
      userEmail: ['', [Validators.email, Validators.required]],
      userPassword: ['', []],
      confirm: ['', [this.confirmValidator]],
      userCall: ['', [Validators.required, Validators.pattern('^[1][0-9]{10}$')]],
      userSex: ['', [Validators.required]],
      userBirth: ['', [Validators.required]],
    });
    this.beforeUpdataUser.beforeUpdataUser().subscribe(
      (result: Msg) => {
        this.validateForm.patchValue({
          userEmail: result.data.userEmail,
          userName: result.data.userName,
          userCall: result.data.userCall,
          userSex: result.data.userSex,
          userBirth: result.data.userBirth,
        });
      }
    );
  }

  ngOnInit(): void {
  }

}
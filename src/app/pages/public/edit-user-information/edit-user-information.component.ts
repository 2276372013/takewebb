import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { BeforeUpdataUserService } from 'src/app/service/beforeUpdataUser.service';
@Component({
  selector: 'app-edit-user-information',
  templateUrl: './edit-user-information.component.html',
  styleUrls: ['./edit-user-information.component.scss']
})
export class EditUserInformationComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(value: { userName: string; userEmail: string; userPassword: string;userSex: string; userBirth: string; userCall: string }): void {
    for (const key in this.validateForm.controls) {
      //脏校验
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.beforeUpdataUser.updataUser(value).subscribe(
      (result: Msg) => {
        console.log(result);
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

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {};
    } else if (control.value !== this.validateForm.controls.userPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder, private beforeUpdataUser: BeforeUpdataUserService) {
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
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Msg } from 'src/app/interfaceEntity/Entity/Msg.interface';
import { UsersService } from 'src/app/service/Users.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as OSS from 'ali-oss'
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-edit-user-information',
  templateUrl: './edit-user-information.component.html',
  styleUrls: ['./edit-user-information.component.scss']
})
export class EditUserInformationComponent implements OnInit {

  validateForm: FormGroup;
  buttonDisplay: boolean;
  userphoto = "";
  userdescribe = "";
  form: FormGroup;

  submitForm(value: { userName: string; userEmail: string; userPassword: string; userSex: string; userBirth: Date; userCall: string }, template: TemplateRef<any>): void {
    for (const key in this.validateForm.controls) {
      //脏校验
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.usersService.updataUser(value).subscribe(
      (result: Msg) => {
        if ((result.status === 200) && (result.data === 1)) {
          this.buttonDisplay = true;
          this.notification.template(template);
        } else {
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

  constructor(private message: NzMessageService, private formBuilder: FormBuilder, private fb: FormBuilder, private usersService: UsersService, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      userName: [{ value: '', disabled: true }],
      userEmail: ['', [Validators.email, Validators.required]],
      userPassword: ['', []],
      confirm: ['', [this.confirmValidator]],
      userCall: ['', [Validators.required, Validators.pattern('^[1][0-9]{10}$')]],
      userSex: ['', [Validators.required]],
      userBirth: ['', [Validators.required]],
    });
    this.usersService.beforeUpdataUser().subscribe(
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
    this.form = this.formBuilder.group({
      comment: [null, [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.getInfor();
  }

  getInfor() {
    this.usersService.photoAinfo().subscribe(
      (result: Msg) => {
        result.data.forEach(item => {
          if (item.exName == 'userPhoto') {
            this.userphoto = item.exVal;
          } else if (item.exName == 'userDescribe') {
            this.userdescribe = item.exVal;
          }
        });
      }
    );
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  fileEvent(fileInput: any) {
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI4GDqNLNrM9iBJXFngX7h',
      accessKeySecret: 'HNGUCQGMUUjDLa0tr0lYxAZVW2O1dg',
      bucket: 'haoliang-bucket',
    });
    var base64Data;
    const reader2 = new FileReader()
    const fileName = fileInput.target.files[0].name;
    reader2.readAsDataURL(fileInput.target.files[0]);
    reader2.onload = () => {
      base64Data = reader2.result;
      // console.log(reader2.result); //获取到base64格式图片

      var byteString;
      if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);//base64 解码
      else {
        byteString = unescape(base64Data.split(',')[1]);
      }
      var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png

      // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
      // var ia = new Uint8Array(arrayBuffer);//创建视图
      var ia = new Uint8Array(byteString.length);//创建视图
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ia], {
        type: mimeString
      });

      let userNam = 'takeit/userPhoto/' + window.localStorage.getItem('username') + '/' + fileName + '.png';

      client.put(userNam, blob).then(r1 => {
        this.usersService.photoInsert(r1.url).subscribe(
          (result: Msg) => {
            if ((result.status === 200)) {
              this.message.create('success', `更新成功！`);
              //刷新goods列表
              this.getInfor();
            } else {
              this.message.create('error', `更新失败了！`);
            }
          }
        );
        // return client.get(userNam);
      }).then(r2 => {
        // console.log('get success: %j', r2);
      }).catch(err => {
        // console.error('error: %j', err);
      });
    };

  }

  editDescribe(){
    this.usersService.editDescribe(this.userdescribe).subscribe(
      (result: Msg) => {
        if ((result.status === 200)) {
          this.message.create('success', `更新成功！`);
          //刷新goods列表
          this.getInfor();
        } else {
          this.message.create('error', `更新失败了！`);
        }
      }
    );
  }

}
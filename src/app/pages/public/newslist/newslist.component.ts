import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/service/News.service';
import { Msg } from '../../../interfaceEntity/Entity/Msg.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnInit {

  Wechat = '';

  constructor(private formBuilder: FormBuilder,private newsService:NewsService,private message: NzMessageService) {
    this.form = this.formBuilder.group({
      comment: [null, [Validators.maxLength(500)]]
    });
  }
  ngOnInit(): void {
  }

  visible = false;
  placement: NzDrawerPlacement = 'top';
  form: FormGroup;

  open(url?: string): void {
    if (url) {
      window.open(url)
    } else {
      this.visible = true;
    }
  }

  close(send?:String): void {
    if(send){
      this.newsService.insertWechat(this.Wechat).subscribe(
        (result: Msg) => {
          if ((result.status === 200)) {
            if(result.data === 1){
              this.message.create('success', `编辑成功！`);
            }else{
              this.message.create('error', `编辑失败！`);
            }
          } else {
            this.message.create('warning', `系统错误！`);
          }
        }
      );
    }
    this.visible = false;
  }

}

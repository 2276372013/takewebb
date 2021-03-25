import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      comment: [null, [Validators.maxLength(500)]]
    });
  }
  ngOnInit(): void {
  }

  visible = false;
  placement: NzDrawerPlacement = 'top';
  form: FormGroup;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}

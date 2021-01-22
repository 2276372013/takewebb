import { Component, OnInit } from '@angular/core';
import getISOWeek from 'date-fns/getISOWeek';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  date = null;
  isEnglish = false;

  constructor(private i18n: NzI18nService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onChange(result: Date): void {
  }

  getWeek(result: Date): void {
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }

}

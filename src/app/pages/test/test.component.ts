import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import getISOWeek from 'date-fns/getISOWeek';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  date: Date[] = [new Date(),new Date()];

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    console.log(this.date)
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
}

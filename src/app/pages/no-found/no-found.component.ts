import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-found',
  templateUrl: './no-found.component.html',
  styleUrls: ['./no-found.component.scss']
})
export class NoFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  BackWelcome(e: MouseEvent): void {
    this.router.navigate(['welcome']);
  }

}

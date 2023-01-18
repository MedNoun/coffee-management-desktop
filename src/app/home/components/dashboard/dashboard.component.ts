import { Component, OnInit } from '@angular/core';
import { DateRange } from 'igniteui-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public range: DateRange = {
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 5)),
  };
  constructor() {}

  ngOnInit(): void {}
  info(e) {
    if (e.event === undefined) {
      console.log('going to charts');
    }
  }
}

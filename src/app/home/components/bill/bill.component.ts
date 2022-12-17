import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  private _admin: boolean;
  constructor(private readonly userService: UserService) {}
  ngOnInit(): void {
    this.userService.observable.subscribe((v) => {
      this._admin = v;
    });
  }
  get admin() {
    return this._admin;
  }
}

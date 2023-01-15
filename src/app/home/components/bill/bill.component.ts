import { Component, Input, OnInit } from '@angular/core';
import { Bill, Product } from '../../../../assets';
import { BillService, HistoryService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  @Input('bill') private _bill: Bill;
  constructor(
    private readonly userService: UserService,
    private readonly billService: BillService
  ) {}
  ngOnInit(): void {}

  print() {
    throw new Error('Method not implemented.');
  }
  gPdfServers() {
    throw new Error('Method not implemented.');
  }

  deleteProduct(product: Product) {
    this.billService.deleteProduct(product);
  }
  get admin() {
    return this.userService.admin;
  }
  get bill() {
    return this._bill;
  }
  private set bill(b: Bill) {
    this._bill = b;
  }
  get total() {
    return this.bill.purchases.reduce((total, purchase) => {
      return total + purchase.product.price * purchase.quantity;
    }, 0);
  }
}

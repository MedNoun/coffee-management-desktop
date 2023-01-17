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
  @Input('bill') private _currentBill: Bill;
  public isLoading: boolean = false;
  constructor(
    private readonly userService: UserService,
    private readonly billService: BillService,
    private readonly historyService: HistoryService
  ) {}
  ngOnInit(): void {}

  print() {
    throw new Error('Method not implemented.');
  }
  gPdfServers() {
    throw new Error('Method not implemented.');
  }

  async previous() {
    this.isLoading = true;
    this.billService.previous().then(() => {
      this.isLoading = false;
    });
  }
  next() {
    this.billService.next();
  }
  deleteProduct(product: Product) {
    this.billService.deleteProduct(product);
  }
  get admin() {
    return this.userService.admin;
  }
  get user() {
    return this.userService.currentUser;
  }
  get bill() {
    return this._currentBill;
  }
  private set bill(b: Bill) {
    this._currentBill = b;
  }
  get total() {
    return this.bill.purchases.reduce((total, purchase) => {
      return total + purchase.product.price * purchase.quantity;
    }, 0);
  }
}

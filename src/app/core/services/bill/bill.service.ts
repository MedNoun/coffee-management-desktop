import { Injectable } from '@angular/core';
import { HistoryService } from '../history/history.service';
import { Bill, Product, Purchase, User } from '../../../../assets';
import { BillDto, PurchaseDto } from '../../../shared/models';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _bill: Bill;
  private _currentBill: Bill;
  constructor(
    private readonly historyService: HistoryService,
    private readonly storeService: StoreService
  ) {}
  public async init() {
    this.bill = await this.storeService.create(Bill.name, new BillDto());
    this._currentBill = this.bill;
    this.historyService.init();
  }
  public async closeBill() {
    if (this.bill.purchases.length) {
      const user: User = await this.storeService.create(
        User.name,
        this.bill.user
      );
      const bill: Bill = await this.storeService.save(Bill.name, {
        ...this.bill,
        user,
      });
      this.historyService.pushBill(bill);
      await this.init();
    }
  }
  public async previous() {
    this.bill = await this.historyService.previous();
  }
  public next() {
    this.bill = this.historyService.next() || this.currentBill;
  }
  public async addProduct(product: Product) {
    const existingPurchase = this.bill.purchases.find(
      (purchase) => purchase.product.id === product.id
    );
    if (existingPurchase) {
      existingPurchase.quantity += 1;
    } else {
      // Add the new purchase to the array
      const purchase = await this.storeService.create(
        Purchase.name,
        new PurchaseDto(product)
      );
      this.bill.purchases.push(purchase);
    }
  }
  public removeProduct(product: Product) {
    const existingPurchase = this.bill.purchases.find(
      (purchase) => purchase.product.id === product.id
    );
    if (existingPurchase) {
      if (existingPurchase.quantity > 1) {
        existingPurchase.quantity -= 1;
      } else {
        this.deleteProduct(product);
      }
    }
  }
  public deleteProduct(product: Product) {
    const index: number = this.bill.purchases.findIndex(
      (purchase) => purchase.product === product
    );
    const removed = this.bill.purchases.splice(index, 1);
    return removed;
  }
  // getters
  get bill() {
    return this._bill;
  }
  private set bill(bill: Bill) {
    this._bill = bill;
  }
  get currentBill() {
    return this._currentBill;
  }
  set currentBill(bill) {
    this._currentBill = bill;
  }
}

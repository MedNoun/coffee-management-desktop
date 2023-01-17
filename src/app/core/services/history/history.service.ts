import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Bill } from '../../../../assets';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private limit: number = 0;
  private offset: number = 0;
  private _bills: Bill[] = [];
  private currentBill: number = -1;

  constructor(private readonly storeService: StoreService) {}
  public init() {
    this.currentBill = -1;
  }
  public async populate() {
    if (this.bills.length === this.limit) {
      this.offset = this.limit;
      this.limit += 10;
      const ancientBills: Bill[] = await this.storeService.find(Bill.name, {
        relations: ['purchases', 'purchases.product'],
        limit: this.limit,
        offset: this.offset,
        withDeleted: true,
      });
      this.bills = [...this.bills, ...ancientBills];
      return true;
    }
    return false;
  }
  public pushBill(bill: Bill) {
    this.bills = [...this.bills, bill];
  }
  public async previous() {
    if (this.currentBill + 1 === this.bills.length) {
      if (await this.populate()) {
        this.currentBill += 1;
      }
    } else {
      this.currentBill += 1;
    }
    return this.bill;
  }
  public next() {
    if (this.currentBill > 0) {
      this.currentBill -= 1;
      return this.bill;
    } else {
      this.currentBill = -1;
    }
  }
  public get bills() {
    return this._bills;
  }
  private get bill() {
    return this.bills[this.currentBill];
  }
  private set bills(items: Bill[]) {
    this._bills = items.sort(
      (a, b) => b.createAt.getTime() - a.createAt.getTime()
    );
  }
}

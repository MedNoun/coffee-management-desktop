import { Injectable } from '@angular/core';
import { StoreService } from '..';
import { Bill } from '../../../../assets';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private limit: number = 0;
  private offset: number = 0;
  private _bills: Bill[] = [];
  private currentBill: number = 0;
  constructor(private readonly storeService: StoreService) {}
  public async populate() {
    this.offset = this.limit;
    this.limit += 10;
    const ancientBills: Bill[] = await this.storeService.find(Bill.name, {
      relations: ['purchases', 'purchases.product'],
      limit: this.limit,
      offset: this.offset,
      withDeleted: true,
    });
    console.log(
      'this is the bills mq lskjdfqmsldkf jqmsldkfj mqslkfd j: ',
      ancientBills
    );

    this.bills = [...this.bills, ...ancientBills];
  }
  public async previous() {
    if (this.currentBill + 1 >= this.limit) {
      await this.populate();
    }
    if (this.currentBill < this.bills.length - 1) {
      this.currentBill += 1;
    }
    return this.bill;
  }
  public next() {
    if (this.currentBill) {
      this.currentBill -= 1;
      return this.bill;
    }
  }
  public get bills() {
    return this._bills;
  }
  public get bill() {
    return this.bills[this.currentBill];
  }
  private set bills(items: Bill[]) {
    this._bills = items.sort(
      (a, b) => b.createAt.getTime() - a.createAt.getTime()
    );
  }
}

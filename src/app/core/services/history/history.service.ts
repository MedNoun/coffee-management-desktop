import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Bill } from '../../../../assets';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private limit: number;
  private offset: number;
  private _bills: Bill[];
  private currentBill: number;

  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UserService
  ) {}
  public init() {
    this.currentBill = -1;
    this.bills = [];
    this.limit = 0;
    this.offset = 0;
  }
  public async populate() {
    if (this.bills.length === this.limit) {
      this.offset = this.limit;
      this.limit += 10;
      console.log(this.userService.currentUser);
      
      const ancientBills: Bill[] = await this.storeService.find(Bill.name, {
        where: { user: {id :this.userService.currentUser.id} },
        order: {
          createdAt: 'DESC',
        },
        relations: ['purchases', 'purchases.product'],
        take: this.limit,
        skip: this.offset,
        withDeleted: true,
      });
      
      console.log("bills: ",ancientBills);
      
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
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

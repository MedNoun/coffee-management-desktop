import { Injectable } from '@angular/core';
import { remove } from 'lodash';
import { Subject } from 'rxjs';
import { Product } from '../../../../assets';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _products: Product[];
  private mainSubject: Subject<Product[]> = new Subject<Product[]>();
  constructor() {}

  addProduct(product: Product) {
    this._products.push(product);
    this.next();
  }
  removeProduct(id: number) {
    remove(this.products, (item) => item.id === id);
  }

  // getters
  get products() {
    return this._products;
  }
  private set products(products: Product[]) {
    this._products = products;
    this.next();
  }
  // observables methods
  get observable() {
    return this.mainSubject.asObservable();
  }
  private next() {
    this.mainSubject.next(this.products);
  }
}

import { Injectable } from '@angular/core';
import { dropWhile } from 'lodash';
import { Product } from '../../../../assets';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _products: Product[];
  constructor() {}

  addProduct(product: Product) {
    this._products.push(product);
  }
  removeProduct(id: number) {
    this._products = dropWhile(this.products, { productId: id });
  }

  // getters
  get products() {
    return this._products;
  }
}

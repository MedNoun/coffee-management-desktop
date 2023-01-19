import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../../../../assets';
import { BillService, ProductService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class HomeResolver implements Resolve<any> {
  constructor(
    private readonly productService: ProductService,
    private readonly billService: BillService
  ) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const productInit = this.productService
      .find()
      .then(() => true)
      .catch((e) => {
        console.log('Error Home Resolver : ', e);
        return false;
      });
    await this.billService.init();
    return { productInit };
  }
}

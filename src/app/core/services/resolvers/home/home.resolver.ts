import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../../../../../assets';
import { ProductService } from '../../product/product.service';

@Injectable({
  providedIn: 'root',
})
export class HomeResolver implements Resolve<boolean> {
  constructor(private readonly productService: ProductService) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.productService
      .find()
      .then(() => true)
      .catch((e) => {
        console.log('Error Resolver : ', e);
        return false;
      });
  }
}

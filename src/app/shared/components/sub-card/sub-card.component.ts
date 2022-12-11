import { Component, Input, OnInit } from '@angular/core';
import { Category, Product } from '../../../../assets';
import { ProductService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-sub-card',
  templateUrl: './sub-card.component.html',
  styleUrls: ['./sub-card.component.scss'],
})
export class SubCardComponent implements OnInit {
  @Input('product') private _product: Product = new Product();
  private _admin: boolean;
  constructor(private readonly userService: UserService) {
    this._admin = this.userService.admin;
  }
  ngOnInit(): void {
    this.userService.observable.subscribe((v) => {
      this._admin = v;
    });
  }

  add() {}
  remove() {}

  commandThisArticle(nameOfProduct: string) {}
  sendDataToParent(event?) {}
  delete(item) {}
  cancelCommandOfThisArticle(nameOfProduct: string) {}

  // getters
  get admin() {
    return this._admin;
  }
  get product() {
    return this._product;
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Category, Product } from '../../../../assets';
import { BillService, ProductService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-sub-card',
  templateUrl: './sub-card.component.html',
  styleUrls: ['./sub-card.component.scss'],
})
export class SubCardComponent implements OnInit, OnDestroy {
  @Input('product') private _product: Product = new Product();
  private _admin: boolean;
  private subscription: Subscription;
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly billService: BillService
  ) {}
  ngOnInit(): void {
    this.subscription = this.userService.observable.subscribe((admin) => {
      this._admin = admin;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  add() {
    this.billService.addProduct(this.product);
  }
  remove() {
    this.billService.removeProduct(this.product);
  }
  delete() {
    this.productService.removeProduct(this.product.id);
  }
  async onFileChange(event, id) {
    await this.productService.changeProductPicture(event.target.files[0], id);
  }
  commandThisArticle(nameOfProduct: string) {}
  sendDataToParent(event?) {}
  cancelCommandOfThisArticle(nameOfProduct: string) {}

  // getters
  get admin() {
    return this._admin;
  }
  private set admin(admin: boolean) {
    this._admin = admin;
  }
  get product() {
    return this._product;
  }
}

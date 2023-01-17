import { Component, Input, OnInit } from '@angular/core';
import { Category, Product } from '../../../../assets';
import { BillService, ProductService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-sub-card',
  templateUrl: './sub-card.component.html',
  styleUrls: ['./sub-card.component.scss'],
})
export class SubCardComponent implements OnInit {
  @Input('product') private _product: Product = new Product();
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly billService: BillService
  ) {}
  ngOnInit(): void {}

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
    console.log('event : ', event.target.files[0]);

    const response = await this.productService.changeProductPicture(
      event.target.files[0],
      id
    );
  }
  commandThisArticle(nameOfProduct: string) {}
  sendDataToParent(event?) {}
  cancelCommandOfThisArticle(nameOfProduct: string) {}

  // getters
  get admin() {
    return this.userService.admin;
  }
  get product() {
    return this._product;
  }
}

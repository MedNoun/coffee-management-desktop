import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../../assets';
import { ProductService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private _admin: boolean;
  @Input('category') private _category: Category = new Category();
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) {
    this._admin = this.userService.admin;
  }
  ngOnInit(): void {
    // get the user context
    this.userService.observable.subscribe((v: boolean) => {
      this._admin = v;
    });
  }
  delete() {
    console.log('deleting');
    this.productService.removeCategory(this.category.categoryId);
  }
  handleClick() {
    this.productService.next(this.category);
  }

  onFileChanged(event, id) {}

  callSubProducts(name: string) {}

  // getters :
  get admin() {
    return this._admin;
  }
  get category() {
    return this._category;
  }
}

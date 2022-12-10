import { Component, Input, OnInit } from '@angular/core';
import { Category, Product } from '../../../../assets';
import { ProductService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private _context: boolean;
  @Input('category') private _category: Category = {
    categoryId: 0,
    categoryImage: '../../../../assets/background.jpg',
    categoryName: 'Milk',
    products: [],
  };
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) {
    this._context = this.userService.context;
  }
  ngOnInit(): void {
    // get the context of the admin
    this.userService.observable.subscribe((v: boolean) => {
      this._context = v;
    });
  }
  delete() {
    this.productService.removeCategory(this.category.categoryId);
  }
  handleClick() {
    this.productService.next(this.category);
  }

  onFileChanged(event, id) {}

  callSubProducts(name: string) {}

  // getters :
  get context() {
    return this._context;
  }
  get category() {
    return this._category;
  }
}

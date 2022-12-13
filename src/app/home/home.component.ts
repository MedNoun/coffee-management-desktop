import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../assets';
import { ProductService } from '../core/services';
import { UserService } from '../core/services/user/user.service';
import { CategoryDto, ProductDto } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private _categories: Category[];
  private _category: Category;

  constructor(
    private router: Router,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {
    this._categories = this.productService.categories;
    this._category = this.productService.category;
  }
  ngOnInit(): void {
    this.productService.observable.subscribe((v) => {
      this._categories = v;
      this._category = this.productService.category;
    });
  }

  async addCategory() {
    const category = new CategoryDto();
    category.products.push(new ProductDto());
    category.products.push(new ProductDto());
    this.productService.create(category);
  }
  async deleteCategory() {
    this.productService.delete(this.categories[0]);
  }

  // getters setters
  get categories() {
    return this._categories;
  }
  get category() {
    return this._category;
  }
}

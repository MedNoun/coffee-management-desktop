import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private _admin: boolean;

  constructor(
    private router: Router,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {
    this._categories = this.productService.categories;
    this._category = this.productService.category;
    this._admin = this.userService.admin;
  }
  ngOnInit(): void {
    this.productService.observable.subscribe((v) => {
      this._categories = v;
      this._category = this.productService.category;
    });
    this.userService.observable.subscribe((v) => {
      this._admin = v;
    });
  }
  async saveChanges() {
    await this.productService.persist();
  }
  async addProduct() {
    const product = new ProductDto();
    await this.productService.addProduct(product);
  }
  async addCategory() {
    const category = new CategoryDto();
    await this.productService.addCategory(category);
  }
  async deleteCategory() {
    await this.productService.removeCategory(this.categories[0].id);
  }

  // getters setters
  get categories() {
    return this._categories;
  }
  get category() {
    return this._category;
  }
  get admin() {
    return this._admin;
  }
}

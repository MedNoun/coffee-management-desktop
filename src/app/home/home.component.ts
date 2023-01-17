import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Bill, Category } from '../../assets';
import { BillService, ProductService } from '../core/services';
import { UserService } from '../core/services/user/user.service';
import { CategoryDto, ProductDto } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = false;
  private _categories: Category[];
  private _category: Category;
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly billService: BillService
  ) {
    this._categories = this.productService.categories;
    this._category = this.productService.category;
  }
  ngOnInit(): void {
    this.productService.observable.subscribe((categories) => {
      this._categories = categories;
      this._category = this.productService.category;
    });
  }
  // admin handlers functions
  public async saveChanges() {
    this.isLoading = true;
    await this.productService.persist();
    this.productService.find().then(() => {
      this.isLoading = false;
      Swal.fire('Saved !', 'Your changes were saved successfully !', 'success');
    });
  }
  public async addProduct() {
    const product = new ProductDto();
    await this.productService.addProduct(product);
  }
  public async addCategory() {
    const category = new CategoryDto();
    await this.productService.addCategory(category);
  }
  // Command functions
  public async reset() {
    await this.billService.init();
  }
  public async finish() {
    await this.billService.closeBill();
    Swal.fire(
      'Bill executed !',
      'Your command was launched successfully !',
      'success'
    );
  }
  // getters setters
  get categories() {
    return this._categories;
  }
  get category() {
    return this._category;
  }
  get admin() {
    return this.userService.admin;
  }
  get bill() {
    return this.billService.bill;
  }
}

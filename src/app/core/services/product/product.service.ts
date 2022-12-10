import { Injectable, OnInit } from '@angular/core';
import { dropWhile, find } from 'lodash';
import { Subject } from 'rxjs';
import { Category, Product, Role } from '../../../../assets';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  private currentCategory: number;
  private _categories: Category[];
  private mainSubject: Subject<Category> = new Subject<Category>();

  constructor(private readonly storeService: StoreService) {
    this.readAll();
  }
  ngOnInit(): void {}

  //database Logic
  private async readAll() {
    this._categories = await this.storeService.readAll(Category.name);
    this.currentCategory = 0;
  }
  public async create(
    category: Partial<Category> & Pick<Category, 'categoryName' | 'products'>
  ) {
    return await this.storeService.create(Category.name, category);
  }
  public async update(id: number, category: Partial<Category>) {
    return await this.storeService.update(id, Category.name, category);
  }
  public async delete(
    category: Partial<Category> & Pick<Category, 'categoryId'>
  ) {
    return await this.storeService.delete(Category.name, category);
  }

  //Category Logic
  get category() {
    return find(this._categories, { categoryId: this.currentCategory });
  }
  removeCategory(id: number) {
    this._categories = dropWhile(this._categories, { categoryId: id });
  }
  addCategory(category: Category) {
    this._categories.push(category);
  }

  //Product logic
  get products(): Product[] {
    return this.category.products;
  }
  addProduct(product: Product) {
    this.category.products.push(product);
  }
  removeProduct(id: number) {
    this.category.products = dropWhile(this.category.products, {
      productId: id,
    });
  }

  //observables
  get observable() {
    return this.mainSubject.asObservable();
  }
  next(category: Category) {
    this.mainSubject.next(category);
  }
}

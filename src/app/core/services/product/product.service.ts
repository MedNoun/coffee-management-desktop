import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product, Role } from '../../../../assets';
import { CategoryDto, ProductDto } from '../../../shared/models';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  private _category: number;
  private _categories: Category[] = [];

  // this new is just for adding a fake id to the forms to add will be later remove in the persist method
  private newId: number = 0;
  //contains the categories to delete
  private toDelete: Category[] = [];

  constructor(
    private readonly storeService: StoreService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  //database Logic
  public async persist() {
    for (let el of this.categories) {
      el.id < 0 && delete el.id;
      for (let pro of el.products) {
        pro.id < 0 && delete pro.id;
      }
      await this.storeService.save(Category.name, el);
    }
    for (let cat of this.toDelete) {
      await this.storeService.remove(Category.name, cat);
    }
    this.toDelete = [];
    this.categories = [];
  }
  public async find() {
    this._categories = await this.storeService.find(Category.name, {
      relations: {
        products: true,
      },
    });
    this.currentCategory = this.categories.length ? this.categories[0].id : -1;

    return this._categories;
  }
  private async create(
    category: Partial<CategoryDto> & Pick<CategoryDto, 'name' | 'products'>
  ) {
    const products: Product[] = await Promise.all(
      category.products.map((v) => {
        return this.storeService.create(Product.name, v);
      })
    );

    const _category: Category = await this.storeService.create(Category.name, {
      ...category,
      products,
    });
    return _category;
  }

  //category logic
  public removeCategory(id: number) {
    const index: number = this.categories.findIndex((item) => item.id === id);
    const removed: Category[] = this.categories.splice(index, 1);
    this.toDelete = [...removed, ...this.toDelete];
    if (id === this.currentCategory) {
      this.currentCategory = this.categories.length
        ? this.categories[0].id
        : -1;
    }
  }
  public async addCategory(category: Category | CategoryDto) {
    const cat: Category = await this.create(category);
    !cat.id && (cat.id = this.id);
    this.categories.push(cat);
  }

  //Product logic
  public async addProduct(product: Product | ProductDto) {
    const _product = await this.storeService.create(Product.name, product);
    !_product.id && (_product.id = this.id);
    this.category.products.push(_product);
  }
  public removeProduct(id: number) {
    const index = this.category.products.findIndex((item) => item.id === id);
    const removed = this.category.products.splice(index, 1);
  }

  //getters + setters
  public get currentCategory() {
    return this._category;
  }
  public get categories() {
    return this._categories;
  }
  public get category() {
    return this._categories.find(
      (category) => category.id === this.currentCategory
    );
  }
  private get id() {
    this.newId -= 1;
    return this.newId;
  }
  public set currentCategory(id: number) {
    this._category = id;
  }
  private set categories(cat) {
    this._categories = cat;
  }
}

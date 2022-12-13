import { Injectable, OnInit } from '@angular/core';
import { dropWhile, find } from 'lodash';
import { Subject } from 'rxjs';
import { Category, Product, Role } from '../../../../assets';
import { CategoryDto, ProductDto } from '../../../shared/models';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  private _category: number;
  private _categories: Category[];
  private mainSubject: Subject<Category[]> = new Subject<Category[]>();

  constructor(private readonly storeService: StoreService) {
    this.find();
  }
  ngOnInit(): void {}

  //database Logic
  private async find() {
    this._categories = await this.storeService.find(Category.name, {
      relations: {
        products: true,
      },
    });
    try {
      this.currentCategory = this._categories[0].categoryId;
    } catch (e) {
      this.currentCategory = -1;
    }
    this.next();
  }
  public async create(
    category: Partial<CategoryDto> &
      Pick<CategoryDto, 'categoryName' | 'products'>
  ) {
    const products: Product[] = await Promise.all(
      category.products.map((v) => {
        return this.preloadProduct(v);
      })
    );

    const _category: Category = await this.storeService.create(Category.name, {
      ...category,
      products,
    });
    this.storeService.save(Category.name, _category).then((category) => {
      this.addCategory(category);
    });
  }
  public async update(id: number, category: Partial<Category>) {
    return await this.storeService.update(id, Category.name, category);
  }
  public async delete(category: Category) {
    this.storeService.remove(Category.name, category).then((v) => {
      this.removeCategory(category.categoryId);
    });
  }
  // helper db functions
  private async preloadProduct(product: Partial<ProductDto>) {
    const _product: Product = await this.storeService.findOneBy(
      Product.name,
      product
    );
    return _product
      ? _product
      : // check why the create does not work IMPORTANT //TODO
        await this.storeService.save(Product.name, product);
  }

  //Category Logic
  get categories() {
    return this._categories;
  }
  get category() {
    return find(this._categories, { categoryId: this.currentCategory });
  }
  set currentCategory(id: number) {
    this._category = id;
    this.next();
  }
  get currentCategory() {
    return this._category;
  }
  public removeCategory(id: number) {
    this._categories = dropWhile(this._categories, { categoryId: id });
    if (id === this.currentCategory) {
      try {
        this.currentCategory = this._categories[0].categoryId;
      } catch (e) {
        this.currentCategory = -1;
      }
    }
    this.next();
  }
  public addCategory(category: Category) {
    this._categories.push(category);
    this.next();
  }

  //Product logic
  get products(): Product[] {
    return this.category.products;
  }
  public addProduct(product: Product) {
    this.category.products.push(product);
    this.next();
  }
  public removeProduct(id: number) {
    this.category.products = dropWhile(this.category.products, {
      productId: id,
    });
    this.next();
  }

  //observables
  get observable() {
    return this.mainSubject.asObservable();
  }
  private next() {
    this.mainSubject.next(this._categories);
  }
}

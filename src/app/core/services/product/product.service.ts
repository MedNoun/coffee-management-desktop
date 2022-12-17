import { Injectable, OnInit } from '@angular/core';
import { find, remove } from 'lodash';
import { Subject } from 'rxjs';
import { Category, Product, Role } from '../../../../assets';
import { CategoryDto, ProductDto } from '../../../shared/models';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  // this new is just for adding a fake id to the forms to add will be later remove in the persist method
  private _new: number = -1;
  private _category: number;
  private _categories: Category[];
  private mainSubject: Subject<Category[]> = new Subject<Category[]>();

  constructor(private readonly storeService: StoreService) {}
  ngOnInit(): void {}

  //database Logic
  public async persist() {
    const new_array: Category[] = [];
    for (let el of this.categories) {
      el.id < 0 && (el.id = undefined);
      this.storeService.save(Category.name, el).then((category) => {
        new_array.push(category);
      });
    }
    this.categories = new_array;
  }
  public async find() {
    this._categories = await this.storeService.find(Category.name, {
      relations: {
        products: true,
      },
    });
    try {
      this.currentCategory = this.categories[0].id;
    } catch (e) {
      this.currentCategory = -1;
    }
    this.next();
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
  //TODO not tested yet
  private async update(id: number, category: Partial<Category>) {
    return await this.storeService.update(id, Category.name, category);
  }
  private async delete(category: Category) {
    this.storeService.remove(Category.name, category).then((v) => {
      this.removeCategory(category.id);
    });
  }
  // helper getters and setters

  public removeCategory(id: number) {
    remove(this.categories, (item) => item.id === id);
    if (id === this.currentCategory) {
      try {
        this.currentCategory = this.categories[0].id;
      } catch (e) {
        this.currentCategory = undefined;
      }
    }
  }
  public async addCategory(category: Category | CategoryDto) {
    const cat: Category = await this.create(category);
    if (!cat.id) {
      cat.id = this.id;
    }
    this.categories.push(cat);
    this.next();
  }

  //Product logic
  public async addProduct(product: Product | ProductDto) {
    const _product = await this.storeService.create(Product.name, product);
    if (!_product.id) {
      _product.id = this.id;
    }
    this.category.products.push(_product);
    this.next();
  }
  public removeProduct(id: number) {
    remove(this.category.products, (item) => item.id === id);
    this.next();
  }

  //getters + setters
  set currentCategory(id: number) {
    this._category = id;
    this.next();
  }
  set categories(cat) {
    this._categories = cat;
    this.next();
  }
  get currentCategory() {
    return this._category;
  }
  get products(): Product[] {
    return this.category.products;
  }
  get categories() {
    return this._categories;
  }
  get category() {
    return find(this._categories, { id: this.currentCategory });
  }
  private get id() {
    this._new -= 1;
    return this._new;
  }
  //observables
  get observable() {
    return this.mainSubject.asObservable();
  }
  private next() {
    this.mainSubject.next(this._categories);
  }
}

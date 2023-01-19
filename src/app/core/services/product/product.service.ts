import { Injectable, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Category, Product } from '../../../../assets';
import { CategoryDto, ProductDto } from '../../../shared/models';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  private _category: number;
  private _categories: Category[] = [];
  // used replay subject so that any new mounting components recives the last value emited
  private mainSubject: ReplaySubject<Category[]> = new ReplaySubject<
    Category[]
  >(1);

  // this new is just for adding a fake id to the forms to add will be later remove in the persist method
  private newId: number = 0;
  //contains the categories to delete
  private categoriesToDelete: Category[] = [];
  //contains products to delete
  private productsToDelete: Product[] = [];

  constructor(private readonly storeService: StoreService) {}
  ngOnInit(): void {}

  //database Logic
  public async persist() {
    // delete categories
    for (let cat of this.categoriesToDelete) {
      await this.storeService.remove(Category.name, cat);
    }
    // delete Products
    for (let prod of this.productsToDelete) {
      await this.storeService.remove(Product.name, prod);
    }
    // Save changes and new elements
    for (let el of this.categories) {
      el.id < 0 && delete el.id;
      for (let pro of el.products) {
        pro.id < 0 && delete pro.id;
      }
      await this.storeService.save(Category.name, el);
    }
    this.categoriesToDelete = [];
    this.productsToDelete = [];
    this.categories = [];
    await this.find();
  }
  public async find() {
    this.categories = await this.storeService.find(Category.name, {
      relations: {
        products: true,
      },
    });
    this.currentCategory = this.categories.length ? this.categories[0].id : -1;

    return this.categories;
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
    this.categoriesToDelete = [...removed, ...this.categoriesToDelete];
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
    const _product : Product = await this.storeService.create(Product.name, product);
    !_product.id && (_product.id = this.id);
    _product.image = this.category.image;
    this.category.products.push(_product);
  }
  public removeProduct(id: number) {
    const index = this.category.products.findIndex((item) => item.id === id);
    const removed = this.category.products.splice(index, 1);
    this.productsToDelete = [...removed, ...this.productsToDelete];
  }

  //changing product picture functionality
  public async changeCategoryPicture(file: any, id: number) {
    const fileName: string = id + '.' + file.name.split('.').at(-1);
    this.storeService
      .copyFile(fileName, file.path, 'icons')
      .then((newPath: string) => {
        const old = this.category.image;
        this.category.image = newPath;
        for (let product of this.category.products) {
          if (product.image === old) {
            product.image = newPath;
          }
        }
        this.mainSubject.next(this.categories);
      })
      .catch((e) => {
        //catch error
      });
  }
  public async changeProductPicture(file: any, id: number) {
    const fileName: string = id + '.' + file.name.split('.').at(-1);
    this.storeService
      .copyFile(fileName, file.path, 'icons')
      .then((newPath: string) => {
        const old = this.category.products.find((product) => product.id === id);
        old.image = newPath;
        this.mainSubject.next(this.categories);
      })
      .catch((e) => {
        //catch error
      });
  }

  //getters + setters
  public get observable() {
    return this.mainSubject.asObservable();
  }
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
    this.mainSubject.next(this._categories);
  }
  private set categories(cat) {
    this._categories = cat;
    this.mainSubject.next(this._categories);
  }
}

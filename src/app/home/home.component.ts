import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Bill, Category, Role, User } from '../../assets';
import { BillService, ProductService } from '../core/services';
import { UserService } from '../core/services/user/user.service';
import { CategoryDto, ProductDto } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  private _categories: Category[];
  private _category: Category;
  private _bill: Bill;
  private _admin: boolean;
  // destroyer to avoid memory leaks when component unmounts
  private destroy$: Subject<void>;
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly billService: BillService
  ) {}
  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.productService.observable
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
        this.category = this.productService.category;
      });
    this.billService.observable
      .pipe(takeUntil(this.destroy$))
      .subscribe((bill) => {
        this.bill = bill;
      });
    this.userService.observable
      .pipe(takeUntil(this.destroy$))
      .subscribe((admin) => {
        this.admin = admin;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // admin handlers functions
  public async saveChanges() {
    this.isLoading = true;
    await this.productService.persist();
    this.isLoading = false;
    Swal.fire('Saved !', 'Your changes were saved successfully !', 'success');
  }
  public async addProduct() {
    await this.productService.addProduct(new ProductDto());
  }
  public async addCategory() {
    await this.productService.addCategory(new CategoryDto());
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
  private set categories(categories: Category[]) {
    this._categories = categories;
  }
  get category() {
    return this._category;
  }
  private set category(category: Category) {
    this._category = category;
  }
  get admin() {
    return this._admin;
  }
  get bill() {
    return this._bill;
  }
  private set bill(bill: Bill) {
    this._bill = bill;
  }
  set admin(admin: boolean) {
    this._admin = admin;
  }
}

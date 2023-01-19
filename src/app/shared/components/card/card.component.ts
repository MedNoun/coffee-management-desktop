import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../../../assets';
import { ProductService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input('category') private _category: Category = new Category();
  private _admin: boolean;
  private subscription: Subscription;
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {
    this.subscription = this.userService.observable.subscribe((admin) => {
      this._admin = admin;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete() {
    this.productService.removeCategory(this.category.id);
  }
  handleClick() {
    this.productService.currentCategory = this.category.id;
  }

  async onFileChange(event, id) {
    console.log('event : ', event.target.files[0]);

    const response = await this.productService.changeCategoryPicture(
      event.target.files[0],
      id
    );
    // if (response) {
    //   // throw error failed
    // } else {
    // }
  }

  // getters :
  get admin() {
    return this._admin;
  }
  get category() {
    return this._category;
  }
}

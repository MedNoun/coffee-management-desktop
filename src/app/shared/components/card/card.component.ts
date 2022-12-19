import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../../assets';
import { ProductService } from '../../../core/services';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input('category') private _category: Category = new Category();
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {}
  delete() {
    this.productService.removeCategory(this.category.id);
  }
  handleClick() {
    this.productService.currentCategory = this.category.id;
  }

  onFileChanged(event, id) {}

  // getters :
  get admin() {
    return this.userService.admin;
  }
  get category() {
    return this._category;
  }
}

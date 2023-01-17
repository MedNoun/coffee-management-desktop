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

  async onFileChanged(event, id) {
    console.log('event : ', event.target.files[0]);

    const response = await this.productService.changePicture(
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
    return this.userService.admin;
  }
  get category() {
    return this._category;
  }
}

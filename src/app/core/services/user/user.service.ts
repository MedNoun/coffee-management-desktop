import { Injectable } from '@angular/core';
import { Role, User } from '../../../../assets';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly storeService: StoreService<User>) {
    storeService.name = User.name;
  }
  public async readAll() {
    return await this.storeService.readAll();
  }
  public async readOne(
    user: Partial<User> &
      (Pick<User, 'email'> | Pick<User, 'username'> | Pick<User, 'userId'>)
  ) {
    return await this.storeService.readOne(user);
  }
  public async create(
    user: Partial<User> &
      Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'password'>
  ) {
    return await this.storeService.create(user);
  }

  public async update(id: number, user: Partial<User>) {
    return await this.storeService.update(id, user);
  }
  public async delete(
    user: Partial<User> &
      (Pick<User, 'email'> | Pick<User, 'username'> | Pick<User, 'userId'>)
  ) {
    return await this.storeService.delete(user);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Role, User } from '../../../../assets';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private admin: boolean = true;
  private mainSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly storeService: StoreService) {}

  //Crud Operations for User
  public async readAll() {
    return await this.storeService.readAll(User.name);
  }
  public async readOne(
    user: Partial<User> &
      (Pick<User, 'email'> | Pick<User, 'username'> | Pick<User, 'userId'>)
  ) {
    return await this.storeService.readOne(User.name, user);
  }
  public async create(
    user: Partial<User> &
      Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'password'>
  ) {
    return await this.storeService.create(User.name, user);
  }

  public async update(id: number, user: Partial<User>) {
    return await this.storeService.update(id, User.name, user);
  }
  public async delete(
    user: Partial<User> &
      (Pick<User, 'email'> | Pick<User, 'username'> | Pick<User, 'userId'>)
  ) {
    return await this.storeService.delete(User.name, user);
  }

  //getters
  get context() {
    return this.admin;
  }

  //observables
  get observable() {
    return this.mainSubject.asObservable();
  }
  next(context: boolean) {
    this.mainSubject.next(context);
  }
}

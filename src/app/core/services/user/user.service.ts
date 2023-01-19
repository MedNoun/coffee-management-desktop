import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Role, User } from '../../../../assets';
import { StoreService } from '../store/store.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _admin: boolean = false;
  private _currentUser: User;
  private _users: User[] = [];
  private mainSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  constructor(
    private readonly storeService: StoreService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  public init() {
    this.currentUser = undefined;
    this.admin = false;
  }
  public async login(payload: Partial<User>) {
    const logged: User = await this.authService.login(payload);
    if (logged) {
      this.currentUser = logged;
      this.admin = this.currentUser.role === Role.admin;
      this.router.navigateByUrl('home');
    }
  }
  //Crud Operations for User
  public async readAll() {
    this._users = await this.storeService.find(User.name, {
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
  }
  public async readOne(
    user: Partial<User> &
      (Pick<User, 'email'> | Pick<User, 'username'> | Pick<User, 'id'>)
  ) {
    return await this.storeService.findOneBy(User.name, user);
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
      (Pick<User, 'email'> | Pick<User, 'username'> | Pick<User, 'id'>)
  ) {
    return await this.storeService.remove(User.name, user);
  }

  //getters
  get observable() {
    return this.mainSubject.asObservable();
  }
  private get admin() {
    return this._admin;
  }
  get users() {
    return this._users;
  }
  get currentUser() {
    return this._currentUser;
  }

  //setters
  private set admin(v: boolean) {
    this._admin = v;
    this.mainSubject.next(v);
  }
  private set currentUser(user: User) {
    this._currentUser = user;
  }
}

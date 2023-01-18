import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
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
  private mainSubject: Subject<User> = new Subject<User>();

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
    return this.authService
      .login(payload)
      .then((user) => {
        if (user) {
          this.currentUser = user;
          this.admin = this.currentUser.role === Role.admin;
        }
      })
      .catch((e) => {
        Swal.fire('Login Failed', e.message, 'error');
      });
  }
  public logout() {
    this.router.navigateByUrl('auth');
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
  get admin() {
    return this._admin;
  }
  get observable() {
    return this.mainSubject.asObservable();
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
  }
  private set currentUser(user: User) {
    this.mainSubject.next(this.currentUser);
    this._currentUser = user;
  }
}

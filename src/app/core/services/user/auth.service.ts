import { Injectable } from '@angular/core';
import { User } from '../../../../assets';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { StoreService } from '../store/store.service';
import { throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private readonly http: HttpClient
  ) {}
  private readonly apiUrl: string;
  async register() {}
  async localLogin(user: Partial<User>) {
    const identifier = Object.create(user);
    delete identifier.password;
    const requested: User = await this.storeService.findOneBy(
      'User',
      identifier
    );
    if (requested) {
      user.password = bcrypt.hashSync(user.password, requested.salt);
      if (user.password === requested.password) {
        return requested;
      }
    }
    throwError(() => {
      new Error('Login Failed : False Credentials');
    });
  }
  async remoteLogin(user: Partial<User>) {
    return await this.http
      .post<any>(`${this.apiUrl}/login`, user)
      .pipe(tap((response) => console.log(response)));
  }

  async logout() {}
}

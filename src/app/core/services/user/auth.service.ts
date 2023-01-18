import { Injectable } from '@angular/core';
import { Role, User } from '../../../../assets';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreService } from '../store/store.service';
import { catchError, throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { ApiService } from '../api/api.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private readonly http: HttpClient,
    private readonly jwtHelper: JwtHelperService,
    private readonly apiService: ApiService
  ) {}
  private async localLogin(user: Partial<User>) {
    const requested: User = await this.storeService.findOneBy('User', {
      username: user.username,
    });

    if (requested) {
      const hashed = bcrypt.hashSync(user.password, requested.salt);
      if (hashed === requested.password) {
        return requested;
      }
    }
  }

  // private getTokenPayload(token) {
  //   return this.jwtHelper.decodeToken(token);
  // }
  async login(user: Partial<User>) {
    const _user: User = await this.localLogin(user);
    if (_user) {
      this.storeService.delete(_user.username);
      if (_user.role === Role.admin) {
        const token: string = await this.storeService.get(_user.username);

        if (token !== undefined && !this.jwtHelper.isTokenExpired(token)) {
          return _user;
        } else {
          this.apiService.post('user/login', user).subscribe({
            next: (v) => {
              return _user;
            },
            error: (e) => Swal.fire('Login Failed', e.message, 'error'),
            complete: () => console.info('complete'),
          });
        }
      } else {
        return _user;
      }
    } else {
      throw new Error('False Credentials');
    }
  }
}

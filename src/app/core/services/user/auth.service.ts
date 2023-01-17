import { Injectable } from '@angular/core';
import { Role, User } from '../../../../assets';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreService } from '../store/store.service';
import { throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private readonly http: HttpClient,
    private readonly jwtHelper: JwtHelperService
  ) {}
  private readonly apiUrl: string = 'http://localhost:3000';
  private async localLogin(user: Partial<User>) {
    const requested: User = await this.storeService.findOneBy(
      'User',
      {username : user.username}
    );
    console.log(requested, user);

    if (requested) {
      const hashed = bcrypt.hashSync(user.password, requested.salt);

      if (hashed === requested.password) {
        return requested;
      }
    }
    // handle not found error
  }
  private async remoteLogin(user: Partial<User>) {
    return await this.http.post<any>(`${this.apiUrl}/user/login`, user);
  }
  // private getTokenPayload(token) {
  //   return this.jwtHelper.decodeToken(token);
  // }
  async login(user: Partial<User>) {
    const _user: User = await this.localLogin(user);

    if (_user) {
      if (_user.role === Role.admin) {
        const token = await this.storeService.get(_user.username);
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          return _user;
        } else {
          this.remoteLogin(user)
            .then((ob) => {
              ob.subscribe((r) => {
                this.storeService.set(_user.username, r.access_token);
              });
            })
            .catch((e) => {
              // handle internet connexion and not found error
              return e;
            });
        }
      } else {
        return _user;
      }
    } else {
      // handle not found error
    }
  }
}

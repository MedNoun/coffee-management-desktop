import { Injectable } from '@angular/core';
import { Role, User } from '../../../../assets';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreService } from '../store/store.service';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { ApiService } from '../api/api.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private readonly jwtHelper: JwtHelperService,
    private readonly apiService: ApiService
  ) {}
  private async localLogin(user: Partial<User>) {
    const hash: User = await this.storeService.findOneBy(
      'User',
      {
        username: user.username,
      }
    );
    
    if (hash) {
      
      const hashed = bcrypt.hashSync(user.password,hash.salt);
      
      if (hashed === hash.password) {
        const {password,salt,..._user} = hash
        return _user as User;
      }
    }
  }
  public async login(user: Partial<User>, remoteRestriction : boolean = false) {
    try {
      const _user: User = await this.localLogin(user);
      if (!_user) {
        throw new Error('Invalid Credentials');
      }
      if (_user.role !== Role.admin) {
        return _user;
      }
      if(remoteRestriction){
        const token = await this.storeService.get(_user.username);
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          return _user;
        }
        const logged = await lastValueFrom(
          this.apiService.post('user/login', user)
        );
        if (!logged) {
          throw new Error('Error logging to distant server');
        }
        this.storeService.set(_user.username, logged.access_token);
      }
      return _user;
    } catch (e) {
      Swal.fire(
        'Login Failed',
        e.message || "We couldn't reach our server",
        'error'
      );
    }
  }
}

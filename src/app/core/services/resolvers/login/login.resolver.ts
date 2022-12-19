import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginResolver implements Resolve<any> {
  constructor(private readonly userService: UserService) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.userService.readAll();
  }
}

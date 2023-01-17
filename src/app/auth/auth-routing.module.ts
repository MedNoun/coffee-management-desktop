import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginResolver } from '../core/resolvers/login/login.resolver';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    resolve: {
      users: LoginResolver,
    },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

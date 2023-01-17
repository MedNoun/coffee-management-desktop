import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from '../core/resolvers/home/home.resolver';
import { AccessGuard } from '../core/guards/access.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AccessGuard],
    resolve: {
      categories: HomeResolver,
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminGuard],
        children: [],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

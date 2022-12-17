import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from '../core/services/resolvers/home/home.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve:{
      categories: HomeResolver 
    }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

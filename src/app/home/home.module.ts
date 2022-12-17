import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { IgxDatePickerModule } from 'igniteui-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillComponent } from './components/bill/bill.component';

@NgModule({
  declarations: [HomeComponent, BillComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MatButtonModule,
    SweetAlert2Module.forRoot(),
    BrowserModule,
    IgxDatePickerModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
})
export class HomeModule {}

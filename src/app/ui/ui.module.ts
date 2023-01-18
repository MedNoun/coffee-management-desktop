import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {
  IgxButtonModule,
  IgxCardModule,
  IgxDateRangePickerModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxRadioModule,
  IgxRippleModule,
} from 'igniteui-angular';

@NgModule({
  declarations: [],
  imports: [
    //angular material
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    //igniteUI
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxRadioModule,
    IgxDateRangePickerModule,
    IgxInputGroupModule,
    //angular material
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    //igniteUI
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxRadioModule,
    IgxDateRangePickerModule,
    IgxInputGroupModule,
    //browser modules
    BrowserModule,
    BrowserAnimationsModule,
    //browser modules
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    //angular material
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    //igniteUI
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxRadioModule,
    IgxDateRangePickerModule,
    IgxInputGroupModule,
    //browser modules
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class UiModule {}

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
  IgxIconModule,
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
    //browser modules
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class UiModule {}

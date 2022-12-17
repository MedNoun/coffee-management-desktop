import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { SubCardComponent } from './components/sub-card/sub-card.component';
import {
  IgxButtonModule,
  IgxIconModule,
  IgxCardModule,
  IgxRippleModule,
  IgxRadioModule,
} from 'igniteui-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    CardComponent,
    SubCardComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxRadioModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    CardComponent,
    SubCardComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}

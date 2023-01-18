import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { SubCardComponent } from './components/sub-card/sub-card.component';

import { LoaderComponent } from './components/loader/loader.component';
import { UiModule } from '../ui/ui.module';

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
    UiModule,
    ReactiveFormsModule,
  ],
  exports: [
    WebviewDirective,
    CardComponent,
    SubCardComponent,
    LoaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    TranslateModule,
  ],
})
export class SharedModule {}

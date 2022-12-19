import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BillComponent } from './components/bill/bill.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [HomeComponent, BillComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    SweetAlert2Module,
  ],
})
export class HomeModule {}

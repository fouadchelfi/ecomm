import { NgModule } from '@angular/core';
import { OrderFormComponent, OrdersGridComponent } from './pages';
import { SharedModule } from '../../../shared';
import { OrdersRoutingModule } from './orders-routing.module';

const COMPONENTS = [OrdersGridComponent, OrderFormComponent];

@NgModule({
    imports: [SharedModule, OrdersRoutingModule],
    declarations: [COMPONENTS],
})
export class OrdersModule { }
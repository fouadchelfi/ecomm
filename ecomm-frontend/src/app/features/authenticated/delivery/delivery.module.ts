import { NgModule } from '@angular/core';
import { ProvincesPricingFormComponent } from './pages';
import { SharedModule } from '../../../shared';
import { DeliveryRoutingModule } from './delivery-routing.module';

const COMPONENTS = [ProvincesPricingFormComponent];

@NgModule({
    imports: [SharedModule, DeliveryRoutingModule],
    declarations: [COMPONENTS],
})
export class DeliveryModule { }
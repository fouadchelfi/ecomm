import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { DeliveryAndShippingComponent } from './delivery-and-shipping.component';
import { ExchangeAndRecoveryComponent } from './exchange-and-recovery.component';
import { FaqComponent } from './faq.component';
import { PaymentMethodsComponent } from './payment-methods.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { ProductDetailsComponent } from './product-details.component';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { WhoWeAreComponent } from './who-we-are.component';
import { PagesRoutingModule } from './pages-routing.module';

const COMPONENTS = [
    DeliveryAndShippingComponent,
    ExchangeAndRecoveryComponent,
    FaqComponent,
    PaymentMethodsComponent,
    PrivacyPolicyComponent,
    ProductDetailsComponent,
    TermsAndConditionsComponent,
    WhoWeAreComponent,
];

@NgModule({
    imports: [SharedModule, PagesRoutingModule],
    declarations: [COMPONENTS],
})
export class PagesModule { }
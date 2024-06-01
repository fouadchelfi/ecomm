import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';
import { WhoWeAreComponent } from './who-we-are.component';
import { PaymentMethodsComponent } from './payment-methods.component';
import { DeliveryAndShippingComponent } from './delivery-and-shipping.component';
import { ExchangeAndRecoveryComponent } from './exchange-and-recovery.component';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { FaqComponent } from './faq.component';

const routes: Routes = [
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'who-we-are', component: WhoWeAreComponent },
    { path: 'payment-methods', component: PaymentMethodsComponent },
    { path: 'delivery-and-shipping', component: DeliveryAndShippingComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'exchange-and-recovery', component: ExchangeAndRecoveryComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
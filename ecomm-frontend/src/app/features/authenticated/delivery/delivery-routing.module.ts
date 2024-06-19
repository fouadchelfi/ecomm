import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvincesPricingFormComponent } from './pages';

const routes: Routes = [
    { path: '', redirectTo: 'provinces-pricing', pathMatch: 'full' },
    { path: 'provinces-pricing', component: ProvincesPricingFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryRoutingModule { }
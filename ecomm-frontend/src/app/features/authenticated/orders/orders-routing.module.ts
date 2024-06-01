import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderFormComponent, OrdersGridComponent } from './pages';

const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: '', component: OrdersGridComponent },
    { path: ':mode/:id', component: OrderFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from './authenticated-layout.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticatedLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', loadChildren: () => import('./products').then(m => m.ProductsModule) },
            { path: 'categories', loadChildren: () => import('./categories').then(m => m.CategoriesModule) },
            { path: 'orders', loadChildren: () => import('./orders').then(m => m.OrdersModule) },
            { path: 'delivery', loadChildren: () => import('./delivery').then(m => m.DeliveryModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
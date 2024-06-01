import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent, ProductsGridComponent } from './pages';

const routes: Routes = [
    { path: '', component: ProductsGridComponent },
    { path: ':mode/:id', component: ProductFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
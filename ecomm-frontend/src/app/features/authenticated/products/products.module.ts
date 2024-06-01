import { NgModule } from '@angular/core';
import { ProductFormComponent, ProductsGridComponent } from './pages';
import { SharedModule } from '../../../shared';
import { ProductsRoutingModule } from './products-routing.module';

const COMPONENTS = [ProductsGridComponent, ProductFormComponent];

@NgModule({
    imports: [SharedModule, ProductsRoutingModule],
    declarations: [COMPONENTS],
})
export class ProductsModule { }
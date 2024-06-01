import { NgModule } from '@angular/core';
import { CategoryFormComponent, CategoriesGridComponent } from './pages';
import { SharedModule } from '../../../shared';
import { CategoriesRoutingModule } from './categories-routing.module';

const COMPONENTS = [CategoriesGridComponent, CategoryFormComponent];

@NgModule({
    imports: [SharedModule, CategoriesRoutingModule],
    declarations: [COMPONENTS],
})
export class CategoriesModule { }
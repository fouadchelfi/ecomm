import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent, CategoriesGridComponent } from './pages';

const routes: Routes = [
    { path: '', redirectTo: 'categories', pathMatch: 'full' },
    { path: '', component: CategoriesGridComponent },
    { path: ':mode/:id', component: CategoryFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
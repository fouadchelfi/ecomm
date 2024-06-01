import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout.component';
import { HomePageComponent } from './home';

const routes: Routes = [{
    path: '',
    component: PublicLayoutComponent,
    children: [
        { path: '', component: HomePageComponent },
        { path: '', loadChildren: () => import('./pages').then(m => m.PagesModule) },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }

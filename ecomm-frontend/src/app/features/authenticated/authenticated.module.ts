import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedLayoutComponent } from './authenticated-layout.component';
import { DashboardComponent } from './dashboard.component';

const COMPONENTS = [
    AuthenticatedLayoutComponent,
    DashboardComponent,
];

@NgModule({
    imports: [SharedModule, AuthenticatedRoutingModule],
    declarations: [COMPONENTS],
})
export class AuthenticatedModule { }
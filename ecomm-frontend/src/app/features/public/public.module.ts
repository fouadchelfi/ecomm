import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home';
import { PublicLayoutComponent } from './public-layout.component';

@NgModule({
    declarations: [PublicLayoutComponent],
    imports: [SharedModule, PublicRoutingModule, HomeModule],
})
export class PublicModule { }
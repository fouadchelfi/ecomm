import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../../../shared';

const COMPONENTS = [HomePageComponent];

@NgModule({
    imports: [SharedModule],
    declarations: [COMPONENTS],
})
export class HomeModule { }
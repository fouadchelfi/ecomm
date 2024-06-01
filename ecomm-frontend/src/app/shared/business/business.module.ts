import { NgModule } from '@angular/core';
import { ProductItemComponent } from './components';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
    ProductItemComponent
];

@NgModule({
    imports: [CommonModule],
    exports: [COMPONENTS],
    declarations: [COMPONENTS],
})
export class BusinessModule { }
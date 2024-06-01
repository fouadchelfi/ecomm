import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyUiModule } from './my-ui';
import { TextHandlerModule } from './text-handler';
import { BrandingModule } from './branding';
import { AngularMaterialModule } from './material';
import { RouterModule } from '@angular/router';
import { BusinessModule } from './business';

const MODULES = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MyUiModule,
    TextHandlerModule,
    BrandingModule,
    BusinessModule
];

@NgModule({
    imports: [MODULES],
    exports: [MODULES],
    declarations: [],
})
export class SharedModule { }
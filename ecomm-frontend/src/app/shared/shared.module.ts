import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyUiModule } from './my-ui';
import { TextHandlerModule } from './text-handler';
import { BrandingModule } from './branding';
import { AngularMaterialModule } from './material';
import { RouterModule } from '@angular/router';
import { BusinessModule } from './business';
import { NgxEditorModule } from 'ngx-editor';
import { AlgeriaCityPipe, AlgeriaProvincePipe } from './common';
import { TranslateModule } from '@ngx-translate/core';

const MODULES = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MyUiModule,
    TextHandlerModule,
    BrandingModule,
    BusinessModule,
    NgxEditorModule,
    TranslateModule,
];

const PIPES = [AlgeriaProvincePipe, AlgeriaCityPipe];

@NgModule({
    imports: [MODULES],
    exports: [MODULES, PIPES],
    declarations: [PIPES],
})
export class SharedModule { }
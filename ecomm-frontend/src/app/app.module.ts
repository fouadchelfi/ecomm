import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SharedModule, getFrenchPaginatorIntl } from './shared';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe, DecimalPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtInterceptor, SpinnerInterceptor } from './core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Function for loading translation files
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withFetch()),
        { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() },
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
        DatePipe,
        DecimalPipe,
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                disableClose: true,
                autoFocus: false,
            }
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class AppModule { }
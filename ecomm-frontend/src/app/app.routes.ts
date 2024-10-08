import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './core';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features').then(m => m.PublicModule) },
    { path: 'auth', loadChildren: () => import('./features').then(m => m.AuthModule) },
    { path: 'authenticated', loadChildren: () => import('./features').then(m => m.AuthenticatedModule), canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent },
];
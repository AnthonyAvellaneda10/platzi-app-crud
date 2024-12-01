import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/product/product.component')
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

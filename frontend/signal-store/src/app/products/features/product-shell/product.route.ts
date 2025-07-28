import { Routes } from "@angular/router";


export default [
    {
        path: '', 
        loadComponent: () => import('../product-list/product-list').then(m => m.default),
    },
    {
        path: 'product/:id',
        loadComponent: () => import('../product-detail/product-detail'),
    }
] as Routes;
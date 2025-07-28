import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./cart'),
    }
] as Routes
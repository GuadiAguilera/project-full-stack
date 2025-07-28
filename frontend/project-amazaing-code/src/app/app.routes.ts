import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieFormPagesComponent } from './pages/movie-form-pages/movie-form-pages.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movies', component: MovieListComponent},
    {path: 'create', component: MovieFormPagesComponent},
    {path: 'movies/:movieName', component: MovieDetailsComponent}
];

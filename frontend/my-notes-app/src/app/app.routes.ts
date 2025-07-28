import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotesComponent } from './pages/notes/notes.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'notes', component: NotesComponent},
];

import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieFormComponent } from '../../components/movie-form/movie-form.component';

@Component({
  selector: 'app-movie-form-pages',
  standalone: true,
  imports: [HeaderComponent, MovieFormComponent],
  templateUrl: './movie-form-pages.component.html',
  styleUrl: './movie-form-pages.component.css'
})
export class MovieFormPagesComponent {

}

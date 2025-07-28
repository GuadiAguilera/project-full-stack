import { Injectable } from '@angular/core';
import Movie from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: Movie[];
  constructor() { 
    this.movies = [
      {
        name: 'Inception',
        duration: 120,
        director: 'Christopher Nolan'
      },
      {
        name: 'The Matrix',
        duration: 90,
        director: 'Lana Wachowski, Lilly Wachowski'
      }
    ];
  }

  addMovie(movie: Movie): void {
    this.movies.push(movie);
  }

  getMovie(name: string): Movie | undefined {
    return this.movies.find((movie) => movie.name === name);
  }
}

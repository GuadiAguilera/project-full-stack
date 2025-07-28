import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import Movie from '../../models/Movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  selectedMovie?: Movie;
  constructor(private route: ActivatedRoute, private movieService: MovieService) {


  }
  ngOnInit(): void {
        const movieName = this.route.snapshot.params['movieName'];
        this.selectedMovie = this.movieService.getMovie(movieName);
  }
}

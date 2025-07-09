import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

// Dialogs
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }

  addMovieToFavorites(movieId: string): void {
    this.fetchMovies.addMovieToFavorites(movieId).subscribe((response: any) => {
      const updatedUser: any = response;
      localStorage.setItem('user', JSON.stringify(updatedUser));
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreComponent, {
      data: { genre: genre },
      width: '480px',
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorComponent, {
      data: { director: director },
      width: '480px',
    });
  }

  openSynopsisDialog(title: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title: title },
      width: '480px',
    });
  }
}

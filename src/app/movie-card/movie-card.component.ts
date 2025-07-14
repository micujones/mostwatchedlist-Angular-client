import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Dialogs
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss', '../app.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() public movies: any[] = [];

  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /** @hidden */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * This method fetches all of the movies in the database.
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((response) => {
      this.movies = response;
      return this.movies;
    });
  }

  // FAVORITE-RELATED METHODS

  /**
   * This method adds a movie's ID to the user's favorite movies.
   *
   * @param {string} movieId - the movie's ID in the database
   * @returns Replaces the locally storred user with an updated user object
   */
  addMovieToFavorites(movieId: string): void {
    this.fetchMovies.addMovieToFavorites(movieId).subscribe((response) => {
      const updatedUser: any = response;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.snackBar.open('Added to your favorites!', 'OK', { duration: 2000 });
    });
  }

  /**
   * This method removies a movie's ID from the user's favorite movies.
   *
   * @param {string} movieId - the movie's ID in the database
   * @returns Replaces the locally storred user with an updated user object
   */
  removeMovieFromFavorites(movieId: string): void {
    this.fetchMovies.removeMovieFromFavorites(movieId).subscribe((response) => {
      const updatedUser: any = response;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.snackBar.open('Removed from your favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  /** @hidden */
  isFavorited(movieId: string): boolean {
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    return user.favoriteMovies.includes(movieId);
  }

  // DIALOG METHODS

  /**
   * Opens a dialog with the genre's description
   * @param {any} genre - Genre object
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreComponent, {
      data: { genre: genre },
      width: '480px',
    });
  }

  /**
   * Opens a dialog with the director's bio
   * @param {any} director - Director object
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorComponent, {
      data: { director: director },
      width: '480px',
    });
  }

  /**
   * Opens a dialog with the synopsis of the movie
   * @param {string} title - Title of the movie
   */
  openSynopsisDialog(title: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title: title },
      width: '480px',
    });
  }
}

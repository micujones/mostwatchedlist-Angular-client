import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../app.component.scss'],
})
export class ProfileComponent implements OnInit {
  /** The user object pulled from local storage */
  user: any = JSON.parse(localStorage.getItem('user') || '');
  /** An empty array to be populated {@link ngOnInit | when mounting} the app. */
  favoriteMovies: any[] = [];

  constructor(
    public fetchUser: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  /**
   * Fetches the {@link user}'s favorite movies and adds them
   * to the {@link favoriteMovies} array based on the movie IDs.
   *
   * @returns Array of movie objects
   */
  getFavoriteMovies(): void {
    this.fetchUser.getAllMovies().subscribe((response) => {
      response.forEach((movie: any) => {
        if (this.user.favoriteMovies.includes(movie._id))
          this.favoriteMovies.push(movie);
      });
    });
  }

  /**
   * Opens a dialog for updating the {@link user}'s
   * username, password, and/or email.
   */
  openUpdateUserDialog(): void {
    this.dialog.open(UserUpdateComponent, { width: '400px' });
  }

  /** Opens a dialog for deleting the {@link user} */
  openDeleteUserDialog(): void {
    this.dialog.open(UserDeleteComponent, { width: '300px' });
  }
}

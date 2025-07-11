import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserUpateComponent } from '../user-upate/user-upate.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../app.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favoriteMovies: any[] = [];

  constructor(
    public fetchUser: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.getUser();
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    this.fetchUser.getAllMovies().subscribe((response) => {
      response.forEach((movie: any) => {
        if (this.user.favoriteMovies.includes(movie._id))
          this.favoriteMovies.push(movie);
      });
    });
  }

  // getUser(): void {
  //   this.fetchUser.getUser().subscribe((response: any) => {
  //     console.log(response);
  //     this.user = response;
  //     localStorage.setItem('user', JSON.stringify(this.user));
  //     this.favoriteMovies = this.user.favoriteMovies;
  //   });
  // }

  openUpdateUserDialog(): void {
    this.dialog.open(UserUpateComponent, { width: '400px' });
  }

  openDeleteUserDialog(): void {
    this.dialog.open(UserDeleteComponent, { width: '300px' });
  }
}

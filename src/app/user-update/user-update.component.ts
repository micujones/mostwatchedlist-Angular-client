import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss', '../app.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  /**
   * Provides a tertiary container to refer to the previous
   * values in the {@link user} object.
   * */
  oldUser = {
    // Pull properties that can be updated
    username: this.user.username || '',
    password: this.user.password,
    email: this.user.email,
  };

  /**
   * The object where input is updated in real time and used
   * as the body object in {@link updateUser}'s fetch request.
   */
  @Input() updatedUser = {
    username: '',
    password: '',
    email: '',
    birthday: this.user.birthday, // not allowing updating birthday
  };

  constructor(
    public fetchUser: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    public snackBar: MatSnackBar
  ) {}

  /** @hidden */
  ngOnInit(): void {}

  /**
   * Checks if any values from the dialog are left empty,
   * so that it can be set to the previous values stored
   * in the {@link oldUser} object.
   */
  private checkInputUpdated(): void {
    const entries = Object.entries(this.updatedUser); // Source: https://www.youtube.com/watch?v=UxMdQmJfWM8
    for (const [key, value] of entries) {
      if (value === '') this.updateEmptyValue(key);
    }
  }

  /** Updates the value which was determined to be an empty string */
  private updateEmptyValue(key: string): void {
    switch (key) {
      case 'username':
        this.updatedUser.username = this.oldUser.username;
        break;
      case 'password':
        this.updatedUser.password = this.oldUser.password;
        break;
      case 'email':
        this.updatedUser.email = this.oldUser.email;
        break;
      default:
        break;
    }
  }

  /**
   * Updates the {@link user}'s data based on the user input
   * in the {@link updatedUser} object.
   */
  updateUser(): void {
    this.checkInputUpdated();
    this.fetchUser.updateUser(this.updatedUser).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Profile updated.', 'OK', { duration: 2000 });
    });
    setTimeout(window.location.reload.bind(window.location), 1250);
  }
}

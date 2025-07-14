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

  oldUser = {
    // Pull properties that can be updated
    username: this.user.username || '',
    password: this.user.password,
    email: this.user.email,
  };

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

  ngOnInit(): void {
    this.setUser();
  }

  setUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }

  private checkInputUpdated(): void {
    const entries = Object.entries(this.updatedUser); // Source: https://www.youtube.com/watch?v=UxMdQmJfWM8
    for (const [key, value] of entries) {
      if (value === '') this.updateEmptyValue(key);
    }
  }

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

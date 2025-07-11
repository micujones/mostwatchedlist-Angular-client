import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss', '../app.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userCredentials = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (response) => {
        this.dialogRef.close();
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          localStorage.setItem('isLoggedIn', 'true');
        }
        this.snackBar.open('Login successful.', 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', { duration: 2000 });
      }
    );
  }
}

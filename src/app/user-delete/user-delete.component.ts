import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss', '../app.component.scss'],
})
export class UserDeleteComponent {
  constructor(
    public fetchUser: FetchApiDataService,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  deleteUser(): void {
    this.fetchUser.deleteUser().subscribe((response) => {
      this.dialogRef.close();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.snackBar.open(`${response.text}`, 'OK', { duration: 2000 });
      this.router.navigate(['welcome']);
    });
  }
}

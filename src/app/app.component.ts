import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mostwatchedlist-Angular-client';

  constructor(public dialog: MatDialog) {}

  // Open the dialog when button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '480px',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '480px' });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../app.component.scss'],
})
export class NavbarComponent {
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
  }
}

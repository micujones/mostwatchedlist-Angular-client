import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mostwatchedlist-Angular-client';

  /**
   * Evaluates if locally stored key 'isLoggedIn' is equal to true.
   *
   * @returns {boolean} Is they key 'isLoggedIn' set to 'true'
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}

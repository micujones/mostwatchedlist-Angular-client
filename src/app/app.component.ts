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
   * Evaluates if locally stored key 'user' is null.
   *
   * @returns {boolean} Is the key 'isLoggedIn' set to 'true'
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
}

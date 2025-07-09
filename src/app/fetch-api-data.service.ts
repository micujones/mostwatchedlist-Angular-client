import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Fetch URL variables
const apiUrl = 'https://mostwatchedlist-f9604e12841c.herokuapp.com/';
let token: string, user: any, username: string;

const setUserVariables = () => {
  token = localStorage.getItem('token') || '';
  user = JSON.parse(localStorage.getItem('user') || '');
  username = user.username;
};

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // inject HttpClient module into constructor
  // available via this.http
  constructor(private http: HttpClient) {}

  // USER ACCOUNT ACTIONS

  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userCredentials: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getUser(): Observable<any> {
    setUserVariables();
    return this.http
      .get(apiUrl + `users/${username}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // MOVIE ACTIONS

  getAllMovies(): Observable<any> {
    setUserVariables();
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  getFavoriteMovies(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  addMovieToFavorites(movieId: string): Observable<any> {
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  removeMovieFromFavorites(movieId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  getDirector(director: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/director/${director}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  getGenre(genre: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genre}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  // Note to self: Object is replacing Response bc map expects an object
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body: ${error.error}`
      );
    }

    // "pass a factory function to throwError(() => new Error('test'))
    return throwError(() => {
      return new Error('Something went wrong. Please try again later.');
    });
  }
}

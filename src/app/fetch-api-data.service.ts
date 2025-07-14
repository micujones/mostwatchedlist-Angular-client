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

const getUserVariables = () => {
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

  /**
   * Register a user.
   *
   * @param userDetails - Object containing user details
   * @returns {Object} - JSON object of user's data
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs a user into their account.
   *
   * @param userCredentials - Object containing username and password
   * @returns {Object} - JSON object of user's data
   */
  public userLogin(userCredentials: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetch a user's data.
   * @returns {Object} - JSON object containing user data
   */
  public getUser(): Observable<any> {
    getUserVariables();
    return this.http
      .get(apiUrl + `users/${username}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Takes an object to pass as the request body and returns a JSON object of the updated user's data.
   *
   * @param {any} userDetails - An object including username, password, email, and birthday
   * @returns {Object} - JSON object containing updated user data
   */
  updateUser(userDetails: any): Observable<any> {
    getUserVariables();
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete the user.
   * @returns {string} - string confirming the user has been deleted.
   */
  deleteUser(): Observable<any> {
    getUserVariables();
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

  /**
   * Fetches all of the movies in the database.
   * @returns {Array} - JSON array of movie objects
   */
  getAllMovies(): Observable<any> {
    getUserVariables();
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Returns a JSON object of movie's data.
   * @param {string} title - Title of the movie
   */
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

  /**
   * Fetch the user's favorite movies
   * @returns {Array} - JSON array contains IDs of the user's favorite movies.
   */
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

  /**
   * Add a movie ID to a user's favoriteMovies property.
   *
   * @param {string} movieId - ID of the movie
   * @returns {Object} - JSON object of a user's updated data
   */
  addMovieToFavorites(movieId: string): Observable<any> {
    getUserVariables();
    return this.http
      .post(
        apiUrl + `users/${username}/movies/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie ID from a user's favoriteMovies property.
   *
   * @param {string} movieId - ID of the movie
   * @returns {Object} - JSON object of a user's updated data
   */
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

  /**
   * Fetches a JSON object of a director's data, including
   * their name, bio, and birth year.
   *
   * @param {string} director - name of the director
   * @returns {Object} - JSON object of a director's data
   */
  getDirector(director: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/director/${director}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches a JSON object of a genre's data, including
   * its name and description.
   *
   * @param {string} genre - name of the genre
   * @returns {Object} - JSON object of a genre's data
   */
  getGenre(genre: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genre}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Returns either a response or empty object
   *
   * @param {any} res - fetch response
   * @returns {any} - response body
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Throws an error when a request cannot be processed or another problem occurs
   *
   * @param error
   * @returns {Error} - Error object
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + 'Error body:',
        error.error
      );
    }

    // "pass a factory function to throwError(() => new Error('test'))
    return throwError(() => {
      return new Error('Something went wrong. Please try again later.');
    });
  }
}

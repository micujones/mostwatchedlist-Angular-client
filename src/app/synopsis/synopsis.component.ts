import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  template: 'passed in {{data.title}}',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent implements OnInit {
  synopsis: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    public fetchSynopsis: FetchApiDataService,
    public dialogRef: MatDialogRef<SynopsisComponent>
  ) {}

  ngOnInit(): void {
    this.getMovieSynopsis();
  }

  /**
   * This method fetches the data of a movie
   * @returns {string} - string of the movie's description
   */
  getMovieSynopsis(): void {
    this.fetchSynopsis.getMovie(this.data.title).subscribe((response) => {
      this.synopsis = response[0].description;
    });
  }
}

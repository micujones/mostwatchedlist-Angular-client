import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  template: 'passed in {{data.genre}}',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  genre: { name: string; description: string } = {
    name: this.data.genre.name,
    description: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genre: any },
    public fetchGenre: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreComponent>
  ) {}

  /** @hidden */
  ngOnInit(): void {
    this.getGenre();
  }

  /**
   * This method fetches the data of a genre
   * @returns {string} - string of the genre's description
   */
  getGenre(): void {
    this.fetchGenre.getGenre(this.data.genre.name).subscribe((response) => {
      this.genre.description = response;
    });
  }
}

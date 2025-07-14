import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dir } from '@angular/cdk/bidi';

@Component({
  selector: 'app-director',
  template: 'passed in {{data.director}}',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  director: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { director: any },
    public fetchDirector: FetchApiDataService,
    public dialogRef: MatDialogRef<DirectorComponent>
  ) {}

  /** @hidden */
  ngOnInit(): void {
    this.getDirector();
  }

  /**
   * This method fetches the data of a movie's director
   * @returns {Object} Object includes the director's name and bio
   */
  getDirector(): void {
    this.fetchDirector
      .getDirector(this.data.director.name)
      .subscribe((response) => {
        this.director = response;
      });
  }
}

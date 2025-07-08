import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  constructor(public fetchUser: FetchApiDataService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchUser.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      return this.user;
    });
  }
}

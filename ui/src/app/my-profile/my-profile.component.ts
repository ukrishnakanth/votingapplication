import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../_services/current-user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  getUser = []

  constructor(private _currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.currentUser();

  }

  currentUser() {
    this._currentUserService.getCurrentuser()
      .subscribe(
        data => {
          console.log(data);
          this.getUser = data;
        },
        error => { console.log(error); }
      )

  }

}

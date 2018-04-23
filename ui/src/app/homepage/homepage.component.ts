import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public myProfile: any;

  constructor(private _homepageService: HomepageService) { }

  ngOnInit() {
    this.getcurrentuser()

  }

  getcurrentuser() {
    this._homepageService.getcurrentuser()
      .subscribe(
        res => {
          console.log(res);
          this.myProfile = res;
        })


  }

}

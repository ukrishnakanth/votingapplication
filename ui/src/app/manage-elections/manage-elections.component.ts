import { Component, OnInit } from '@angular/core';
import { GetElectionsService } from '../_services/get-elections.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-elections',
  templateUrl: './manage-elections.component.html',
  styleUrls: ['./manage-elections.component.css']
})
export class ManageElectionsComponent implements OnInit {

  electionList: any = [];
  loading = false;

  //btn: String = '';

  constructor(private _getElectionsService: GetElectionsService, private router: Router) { }

  ngOnInit() {
    this.fetchElections();
  }

  fetchElections() {
    this._getElectionsService.fetchElections()
      .subscribe(
        data => {
          //console.log(data.ElectionStatus);
          this.electionList = data;
          this.electionList.forEach(element => {
            //console.log(element);

            if (element.ElectionStatus == 0) {
              element.btn = 'Start Election';

            } else if (element.ElectionStatus == 1) {
              element.btn = 'Stop Election';

            } else if (element.ElectionStatus == 2) {
              element.btn = "Declare Results";
            }

          });

        },
        error => {
          console.log(error);
        });

  }

  startElection(eid, estatus) {
    this.loading = true;
    this._getElectionsService.startElection(eid, estatus)
      .subscribe(data => { 
        window.location.reload();  
      });
    
    //this.router.navigate(['manage-election']);

  }

}

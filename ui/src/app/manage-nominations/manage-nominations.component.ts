import { Component, OnInit } from '@angular/core';
import { NominationService } from '../_services/nomination.service';

@Component({
  selector: 'app-manage-nominations',
  templateUrl: './manage-nominations.component.html',
  styleUrls: ['./manage-nominations.component.css']
})
export class ManageNominationsComponent implements OnInit {

  nomineeList: any = [];

  constructor(private nominationService: NominationService) { }

  ngOnInit() {
    this.fetchNominees();

  }

  fetchNominees() {
    this.nominationService.getAllNominees()
      .subscribe(
        data => {
          console.log(data);
          this.nomineeList = data;
        },
        error => {
          console.log(error);
        });

  }


  approveNomination(nid) {
    this.nominationService.approveNomination(nid)
      .subscribe(
        data => { console.log(data); },
        error => { console.log(error); }
      )
  }

  rejectNomination(nid) {
    this.nominationService.rejectNomination(nid)
      .subscribe(
        data => { console.log(data); },
        error => { console.log(error); }
      )
  }

}

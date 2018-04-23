import { Component, OnInit } from '@angular/core';
import { CreateElectionService } from './create-election.service';

import { AlertService } from '../_services/index';
import { ObjectUnsubscribedError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-election',
  templateUrl: './create-election.component.html',
  styleUrls: ['./create-election.component.css']
})
export class CreateElectionComponent implements OnInit {

  model: any = {};
  public constList: any = [];

  constructor(private createElectSrv: CreateElectionService, private alertService: AlertService, private router: Router) { }


  createElection() {

    this.model.ElectionId = 0;

    console.log(this.model);
    this.createElectSrv.postElection(this.model).subscribe(
      data => {
        this.alertService.success('Hello Election created',true);
        this.router.navigate(['/home']);

        console.log(data);

      },
      error => {
        this.alertService.error(error);
      });
    console.log('election cretaed');
  };



  ngOnInit() {
    this.fetchConstituencies();
  }

  fetchConstituencies() {
    this.createElectSrv.fetchConstituencies()
      .subscribe(
        data => {
          this.constList = data;
        },
        error => {
          this.alertService.error(error);
        });
  }



}

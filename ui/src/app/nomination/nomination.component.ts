import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, NominationService, ConstituencyService } from '../_services/index';
import { GetElectionsService } from '../_services/get-elections.service';
import { CurrentUserService } from '../_services/current-user.service';

import { Nomination, Constituency, Election } from '../_models/index';
// import { ModalPopupService } from '../modal-popup/modal-popup.service';
//import {Constituency }  from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'nomination.component.html'
})

export class NominationComponent implements OnInit, OnDestroy {
    model: any = {};
    loading = false;
    error = false;
    private _subscription: Subscription[] = [];
    private _loggedInUserId: any;
    private nominatedCandidate: Nomination;

    //constitencies drop down
    constituencies: Constituency[];
    elections: Election[];
    //currentSelection: Constituency;

    constructor(
        private router: Router,
        private nominationService: NominationService,
        private _currentUserService: CurrentUserService,
        private constituencyService: ConstituencyService,
        private _getElectionsService: GetElectionsService,
        private alertService: AlertService) { }


    ngOnInit() {

        this.currentUser()
        // will see how to get the login userId which can be used here
        //const params: any = this._route.parent.params;
        //this._loggedInUserId = "59f9e72addb3c471945632c2";


        // RETREIVE ALL CONSTITUENCIES
        this.constituencyService.getAllConstituencies().subscribe(response => {
            // this.model.constitencies = response.constituencies;
            this.constituencies = response;
            //console.log(response);
        })

        //RETRIEVE ALL ELECTIONS
        this._getElectionsService.fetchElections()
            .subscribe(response => {

                // this.model.constitencies = response.constituencies;
                this.elections = response;
                //this.elections.push(this.elections[0].pollingDt = response.pollingDt.getHours())
                //console.log(response);
            })

        //  this.electionService.getElectionInfo().subscribe(response =>{
        //      this.elections = response;
        //       console.log( this.elections);
        //  })

    }



    ngOnDestroy() {
        this._subscription.forEach(sub => sub.unsubscribe());
    }


    registerNomination() {
        console.log("inside registerNomination in NominationComponent.ts file");
        this.loading = true;
        console.log(this.model);
        this.nominationService.createNomination(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Nomination successful', true);
                    this.model._id = '';
                    this.model.age = '';
                    this.model.name = '';
                    this.model.email = '';
                    this.model.maritalStatus = '';
                    this.model.address = '';
                    this.model.gender = '';
                    this.constituencies = [];
                    this.elections = [];
                    this.alertService.success('Nominayion created successfully', true);


                },
                error => {
                    console.log(error);
                    // this.error = true;
                    this.alertService.error(error);
                    // this.alertService.error('Some error occured while creating Nomination', true);
                    this.loading = false;

                });
    }

    currentUser() {
        this._currentUserService.getCurrentuser()
            .subscribe(
                data => {
                    console.log(data);
                    //console.log(typeof (data));
                    this.model.firstname = data[0].firstname;
                    this.model.lastname = data[0].lastname;
                    this.model.email = data[0].email;
                    this.model.uniqueid = data[0].uniqueid;
                    this.model.selectedConstituency = data[0].constituency.constituencyName;
                    console.log(this.model);

                    // this._loggedInUserId = data[0]._id;
                    // console.log(typeof (this._loggedInUserId));

                    // console.log(this._loggedInUserId);
                    // if (this._loggedInUserId) {
                    //     this._subscription.push(

                    //         this.nominationService.getCandidateDetails(this._loggedInUserId)
                    //             .subscribe(response => {
                    //                 console.log(response);

                    //                 this.model._id = response._id;
                    //                 this.model.role = response.role;
                    //                 //this.model.firstname = response.firstname;
                    //                 this.model.lastname = response.lastname;
                    //                 this.model.email = response.email;
                    //                 this.model.maritalStatus = response.MaritalStatus;
                    //                 this.model.address = response.address;
                    //                 this.model.gender = response.gender;
                    //                 //this.model.selectedConstituency = response[0].user_const.constituencyName;

                    //             }));

                    // }

                },
                error => { console.log(error); }
            )

    }

    /*retrieveCandidateDetails() {
        console.log("inside retrieveCandidateDetails in NominationComponent.ts file");
        this.loading = true;
        this.nominationService.getCandidateDetails(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Nomination successful', true);
                    this.router.navigate(['/nomination']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }*/
}


// this._subscription.push(
        //     this.nominationService.getCandidateDetails(this._loggedInUserId)
        //         .subscribe(response => {

        //             this.model._id = response._id;
        //             this.model.age = response.age;
        //             this.model.name = response.name;
        //             this.model.email = response.email;
        //             this.model.maritalStatus = response.MaritalStatus;
        //             this.model.address = response.address;
        //             this.model.gender = response.gender;
        //             //  this.model.constitency = response.constituency[0];

        //         }));
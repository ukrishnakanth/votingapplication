import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BallotService } from './ballot.service';
import { BallotRes } from '../_models/ballotRes';
//import {Constituency }  from '../_models/index';

@Component({
    moduleId: module.id,
    selector: 'app-ballot',
    templateUrl: 'ballot.component.html'
})

export class BallotComponent implements OnInit {
    ballots: BallotRes[];
    voted: boolean = false;
    ballotDetails: any;
    votedCandidate: BallotRes[];


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ballotService: BallotService) { }

    candDetails(cand) {
        this.ballotDetails = {
            'ElectionID': this.route.snapshot.params['id'],
            'Constituency': cand.constituency._id,
            'Candidate': cand.UserId._id,
            'Party': cand.Party
        };
        console.log(this.ballotDetails);

    }

    registerVote() {
        if (confirm(`Are you sure you want to vote for ${this.ballotDetails.Candidate}`))
            console.log(this.ballotDetails);
        this.verifySelection(this.ballotDetails);
        this.ballotService.postBallotBox(this.ballotDetails)
            .subscribe((res) => {
                this.votedCandidate = res;
            });
        this.router.navigate(['home']);


    }

    verifySelection(cand) {
        if (cand) {
            this.voted = true;
        } else {
            alert('Please select a nominee');
        }
    }



    ngOnInit() {
        console.log('=========ballot.ngOnInit=============');
        console.log(this.route.snapshot.params['id']);
        this.ballotService.getBallotBox(this.route.snapshot.params['id'])
            .subscribe((res) => {
                this.ballots = res;
            });

    }
}

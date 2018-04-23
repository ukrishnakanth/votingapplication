import { Component, OnInit } from '@angular/core';
import { ElectionService } from './election.service';
import { Election } from './election.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {

  election: any;
  constructor(private electionService: ElectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.electionService.getElections()
      .subscribe((res) => {
        this.election = res;
        console.log(res);
      });


  }

  navigateToBallet() {
    this.router.navigate(['../ballot'], { relativeTo: this.route, queryParams: { id: 1234 } });
  }

  selectedElection(electionId) {
    console.log(electionId);

  }

}

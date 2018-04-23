import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreateElectionService {
    constructor(private http: Http) { }

    postElection(electionObj) {
        return this.http.post('/api/elections', electionObj)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

    fetchConstituencies() {
        return this.http.get('/api/user/constituencies')
            .map(response => response.json());

    }

}
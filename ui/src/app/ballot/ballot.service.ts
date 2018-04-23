import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BallotRes } from '../_models/ballotRes';

@Injectable()
export class BallotService {
    constructor(private http: Http) { }

    // getBallot(): Observable<Election[]> {
    //     return this.http.get('/api/elections')
    //         .map((response: Response) => response.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    // }



    getBallotBox(eid): Observable<BallotRes[]> {


        // let accessToken = JSON.parse(window.localStorage.currentUser);
        // let params: URLSearchParams = new URLSearchParams();
        // params.set('ElectionId', eid);

        return this.http.get('/api/ballot', { params: { "ElectionId": eid } })
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

    postBallotBox(vCand): Observable<BallotRes[]> {
        return this.http.post('/api/ballot', vCand)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }


}   
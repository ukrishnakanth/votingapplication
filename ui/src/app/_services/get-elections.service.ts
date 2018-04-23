import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class GetElectionsService {
    constructor(private http: Http) { }

    // postElection(electionObj) {
    //     return this.http.post('/api/elections', electionObj)
    //         .map((response: Response) => response.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    // }

    fetchElections() {
        let accessToken = JSON.parse(window.localStorage.currentUser);
        let params: URLSearchParams = new URLSearchParams();
        params.set('access_token', accessToken.token);

        return this.http.get('/api/elections', { search: params })
            .map(response => response.json());

    }

    startElection(eid, estatus) {
        return this.http.put('/api/elections', { ElectionId: eid, ElectionStatus: estatus });
    }
}
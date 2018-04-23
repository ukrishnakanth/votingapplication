import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Dashboard } from '../_models/index';

@Injectable()
export class DashboardService {
    constructor(private http: Http) { }

    get_completed_elections() {
        return this.http.get('/api/dashboard/getelections').map((response: Response) => response.json());
    }

    get_ballots(eid) {
        return this.http.get('api/dashboard/getballots', { params: { ElectionID: eid } }).map((response: Response) => response.json());
    }

}
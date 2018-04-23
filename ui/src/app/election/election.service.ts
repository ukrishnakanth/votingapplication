import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Election } from './election.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Injectable()
export class ElectionService {
    constructor(private http: Http) { }

    getElections(): Observable<Election[]> {

        let accessToken = JSON.parse(window.localStorage.currentUser);
        let params: URLSearchParams = new URLSearchParams();
        params.set('access_token', accessToken.token);

        return this.http.get('/api/elections', { search: params })
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

}
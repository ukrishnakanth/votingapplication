import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CurrentUserService {
    constructor(private http: Http) { }

    public getCurrentuser() {
        let accessToken = JSON.parse(window.localStorage.currentUser);

        return this.http.get('/api/user/myprofile', { params: { access_token: accessToken.token } })
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));

    }

}
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomepageService {
    constructor(private http: Http) { }

    getcurrentuser() {
        return this.http.get('api/user/myprofile').map((response: Response) => response.json());
    }

}
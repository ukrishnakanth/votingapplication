import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Injectable()
export class ModalPopupService {
    errorMessage: string;
    hasError: boolean = false;
    constructor(private http: Http) { }

    showError(errmsg) {
        this.hasError = true;
        this.errorMessage = errmsg;


    }

    clearError() {
        this.hasError = false;
        this.errorMessage = '';

    }

}
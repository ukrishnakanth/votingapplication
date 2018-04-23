import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {


    model: any = {};
    loading = false;
    rolesList: any = [];
    public constList: any = [];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.fetchRoles();
        this.fetchConstituencies();

    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    roleSelected(role: any) {
        console.log(this.model);
    }

    fetchRoles() {
        this.userService.fetchRoles()
            .subscribe(
                data => {
                    this.rolesList = data;
                },
                error => {
                    this.alertService.error(error);
                });
    }

    fetchConstituencies() {
        this.userService.fetchConstituencies()
            .subscribe(
                data => {
                    this.constList = data;
                },
                error => {
                    this.alertService.error(error);
                });
    }

    imagviewe() {
        console.log(this.model);
    }


}


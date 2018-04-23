﻿import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        let token = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = this.userService.convertTokenToUser(token.token);
    }

    ngOnInit() {
        this.loadAllUsers();
    }


    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users.users; });
    }

   

}
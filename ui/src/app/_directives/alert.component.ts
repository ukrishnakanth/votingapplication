import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;
    closeModal:boolean;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.closeModal = true;
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

    closePopup(){
        this.closeModal = false;
    }
}
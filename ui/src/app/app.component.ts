import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalPopupService } from './modal-popup/modal-popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ModalPopupService]
})
export class AppComponent {
  title = 'Welcome to the election !';

  public constructor(private titleService: Title, private _modalPopupService: ModalPopupService) {
    this.titleService.setTitle(this.title);
  }





}

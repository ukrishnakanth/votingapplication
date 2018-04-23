import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {
  @Input() message: string;

  constructor() {
    this.message

  }

  ngOnInit() {

  }

  closePopup() {
    document.getElementById('popup').style.display = "none";
    window.location.reload();
  }


}

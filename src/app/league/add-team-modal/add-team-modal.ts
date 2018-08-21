import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-team-modal',
  templateUrl: "./add-team-modal.html",
  styleUrls: ["./add-team-modal.scss"]
})
export class AddTeamModal {

  constructor(public activeModal: NgbActiveModal) {

  }
  
}
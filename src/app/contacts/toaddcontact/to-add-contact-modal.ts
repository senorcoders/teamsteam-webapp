import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
    selector: 'to-add-contact-modal',
    templateUrl: "./to-add-contact-modal.html",
    styleUrls: ["./to-add-contact-modal.scss"]
})
export class toAddContactModal {

    public toContactGoogle:Function;
    public toContactYahoo:Function;

    constructor(public activeModal: NgbActiveModal
    ) {
        
    }

    

    
}
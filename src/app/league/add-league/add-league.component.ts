import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { ToastrService } from 'ngx-toastr';
import { Interceptor } from '../../interceptor/interceptor';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTeamModal } from '../add-team-modal/add-team-modal';
@Component({
    selector: 'app-add-league',
    templateUrl: './add-league.component.html',
    styleUrls: ['./add-league.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class AddLeagueComponent implements OnInit {

    public form: FormGroup;

    constructor(
        public http: HttpClient, public auth: AuthenticationService,
        public toastCtrl: ToastrService, public fb: FormBuilder,
        public ngbModal: NgbModal
    ) {

    }

    async ngOnInit() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description:["",Validators.nullValidator]
        });
    }

    public errorHandler(event) {
        event.target.src = "/assets/img/logo-icon.png";
    }

    public addTeam() {
        const modalRef = this.ngbModal.open(AddTeamModal);
    }

    public async saveLeague() {

    }
}
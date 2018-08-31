import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TeamService } from '../../services/team.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Interceptor } from '../../interceptor/interceptor';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-event',
    templateUrl: './list-event.component.html',
    styleUrls: ['./list-event.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class ListEventComponent implements OnInit {

    public teams = [];
    public events = [];
    public team: any;
    public showLoading = false;
    public by = "upcoming";
    public userData: any;
    public endpoint = Interceptor.url;

    constructor(private pageTitleService: PageTitleService, private fb: FormBuilder,
        private auth: AuthenticationService, public http: HttpClient,
        public toastr: ToastrService, public route:Router
    ) {
    }

    async ngOnInit() {

        this.userData = this.auth.getLoginData();

        let teams = await this.http.get(`/roles?where={"name":"Manager","user":"${this.userData.id}"}`).toPromise() as any[];
        this.teams = teams.filter(it => {
            return it.team !== undefined;
        });

        this.getEvents();
    }

    public async getEvents() {
        if (this.team === "") {
            this.teams = [];
            return;
        }
        let events = await this.http.get("/event/team/" + this.by + "/" + moment().format("MM-DD-YYYY-hh:mm") + "/" + this.team).toPromise() as any[];
        this.events = events;
        console.log(this.events);
    }

    public errorHandler(event) {
        event.target.src = "assets/img/logo-lockerroom.png";
    }

    public editEvent(event){
        this.route.navigate(["/events/edit/"+ event.id]);
    }

    showError(e) {
        this.showLoading = false;
        this.toastr.error(e, 'Error', { positionClass: "toast-top-right" });
    }

    showSuccess() {
        this.showLoading = false;
        this.toastr.success('Well Done', 'Your event was added Successfully', { positionClass: "toast-top-right" });
    }

    public trackByUsers(index: number, user: any): number {return index; }

}

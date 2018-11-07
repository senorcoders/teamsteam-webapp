import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
    selector: 'view-contact-modal',
    templateUrl: "./view-contact.modal.html",
    styleUrls: ["./view-contact.modal.scss"]
})
export class ViewContact {

    public contact: any;
    public showExecuteDelete = false;
    public userId: string;
    public getContactsExterior: Function;
    public availableActions = true;
    public teams = [];
    public user: any;
    public createPlayerAction = false;
    public teamId = "";
    public isPlayer = false;

    constructor(public activeModal: NgbActiveModal,
        public http: HttpClient, private toast: ToastrService,
        public router: Router, private auth: AuthenticationService
    ) {
        this.user = this.auth.getLoginData();
        for (let role of this.user.roles) {
            if (role.name === "Manager" && Object.prototype.toString.call(role.team) === "[object Object]") {
                this.teams.push(role.team);
            }
        }
    }

    

    public getTypePhone(value: string) {
        let def = {
            home: "Home",
            work: "Work",
            mobile: "Mobile",
            homeFax: "Home Fax",
            workFax: "Work Fax",
            otherFax: "Other fax",
            pager: "Pager",
            workMobile: "Work Mobile",
            workPager: "Work Pager",
            main: "Main",
            googleVoice: "Google Voice",
            other: "Other"
        };
        return def[value];
    }

    public getTypeEmail(value: string) {
        let def = {
            home: "Home",
            work: "Work",
            other: "Other"
        };

        return def[value];
    }

    public async createPlayer() {
        if (this.createPlayerAction === false) {
            this.createPlayerAction = true;
            return;
        }
        if (this.teamId === "") {
            return this.toast.error("Select a team...");
        }
        try {
            await this.http.post("/google/create-player", { team: this.teamId, contact: this.contact }).toPromise();
            this.isPlayer = true;
            this.createPlayerAction = false;
        }
        catch (e) {
            console.error(e);
            this.toast.error("error in create player")
        }
    }

    public edit() {
        this.router.navigate([`contacts/edit/${this.contact.resourceName.split('/')[1]}`])
        this.activeModal.close();
    }

    public delete() {
        this.showExecuteDelete = true;
        setTimeout(function () {
            this.showExecuteDelete = false;
        }.bind(this), 3000)
    }

    public async deleteExecute() {
        this.availableActions = false;
        try {
            await this.http.delete(`/google/contact/get/${this.userId}/${this.contact.resourceName}`).toPromise();
            await this.getContactsExterior();
            this.activeModal.close();
        }
        catch (e) {
            this.toast.error("Unexpected Error")
        }
        this.availableActions = true;
    }

}
import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Interceptor } from '../../interceptor/interceptor';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'view-contact-modal',
    templateUrl: "./view-contact.modal.html",
    styleUrls: ["./view-contact.modal.scss"]
})
export class ViewContact {

    public contact:any;
    public showExecuteDelete = false;
    public userId:string;
    public getContactsExterior:Function;
    public availableActions = true;

    constructor(public activeModal: NgbActiveModal,
        public http: HttpClient, private toast:ToastrService
    ) {

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

    public edit() {

    }

    public delete() {
        this.showExecuteDelete = true;
        setTimeout(function(){
            this.showExecuteDelete = false;
        }.bind(this), 3000)
    }

    public async deleteExecute(){
        this.availableActions = false;
        try{
            await this.http.delete(`/google/contact/get/${this.userId}/${this.contact.resourceName}`).toPromise();
            await this.getContactsExterior();
            this.activeModal.close();
        }
        catch(e){
            this.toast.error("Unexpected Error")
        }
        this.availableActions = true;
    }

}
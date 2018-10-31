import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TeamService } from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { Interceptor } from '../../interceptor/interceptor';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class AddContactComponent implements OnInit {

    private userId;
    private teamId;
    public user: any = { user: { firstName: "", lastName: "" }, positions: [] };
    public image = "";
    public contacts = [];

    public search = "";

    constructor(private pageTitleService: PageTitleService,
        private auth: AuthenticationService, private fb: FormBuilder,
        private toast: ToastrService, private route: ActivatedRoute,
        private http: HttpClient, private router: Router
    ) {

    }

    async ngOnInit() {
        try {
            this.userId = this.route.snapshot.params["id"];
            this.teamId = this.route.snapshot.params["team"];
            this.user = await this.http.get(`/user/${this.userId}`).toPromise();
            this.pageTitleService.setTitle(`Add Contact of ${this.user.firstName} ${this.user.lastName}`);
            // this.image = Interceptor.transformUrl(`/userprofile/images/${this.userId}/${this.player.team.id}`);
            if (this.user.email.includes("@gmail.com"))
                this.contacts = await this.http.get(`/google/contacts/${this.userId}`).toPromise() as any;
            else if (this.user.email.includes("@yahoo"))
                this.contacts = await this.http.get(`/yahoo/contacts/${this.userId}`).toPromise() as any;

            console.log(this.contacts);
        }
        catch (e) {
            console.error(e);
        }
    }

    public errorImage(event) {
        this.image = "/assets/img/user.png";
    }

    public validSame(ct) {
        //Primero validamos concidencia con los nombres.
        let valid = false;
        if (ct.hasOwnProperty("names")) {
            for (let name of ct.names) {
                if (name.displayName.toLowerCase().includes(this.search.toLowerCase())) {
                    valid = true;
                    break;
                }

            }
        }
        if (valid === true)
            return true;
        //con los numeros de telefonos
        if (ct.hasOwnProperty("phoneNumbers")) {
            for (let phone of ct.phoneNumbers) {
                if (phone.value.includes(this.search)) {
                    valid = true;
                    break;
                }

            }
        }
        if (valid === true)
            return true;
        //y finalmente con los correos
        if (ct.hasOwnProperty("emailAddresses")) {
            for (let email of ct.emailAddresses) {
                if (email.value.includes(this.search.toLowerCase())) {
                    valid = true;
                    break;
                }

            }
        }
        if (valid === true)
            return true;

        return false;
    }

}
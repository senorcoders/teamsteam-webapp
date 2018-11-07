import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewContact } from '../view-contact/view-contact.modal';
import { Interceptor } from 'app/interceptor/interceptor';
import { fadeInAnimation } from 'app/core/route-animation/route.animation';
import { AuthenticationService } from 'app/services/authentication.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';


declare var io: any;

@Component({
    selector: 'app-view-contacts',
    templateUrl: './view-contacts.component.html',
    styleUrls: ['./view-contacts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class ViewContactsComponent implements OnInit {

    private userId;
    public user: any = { user: { firstName: "", lastName: "" }, positions: [] };
    public image = "";
    public contacts: { connections: any[], totalItems: Number, totalPeople: number } = { connections: [], totalItems: 0, totalPeople: 0 };
    public requiredPermission = false;

    public search = "";
    public players = [];
    public teams = [];

    private conexion: any;

    constructor(private pageTitleService: PageTitleService,
        private auth: AuthenticationService, private fb: FormBuilder,
        private toast: ToastrService, private route: ActivatedRoute,
        private http: HttpClient, private router: Router,
        private zone: NgZone, public modal: NgbModal
    ) {

    }

    async ngOnInit() {
        try {
            //cargamos los datos del usuario
            let user = this.auth.getLoginData();
            this.userId = user.id;
            await this.getContacts();
            await this.getPlayers();
            this.pageTitleService.setTitle(`Contacts of ${this.user.firstName} ${this.user.lastName}`);
            if ((window as any).io === undefined) {
                await this.initConnetionSockets();
            } else {
                let user = this.auth.getLoginData();
                io.sails.query = `user=${user.id}&token=${user.token}`;
                this.conexion = io.sails.connect(Interceptor.url, { reconnection: true });
                this.conexion.on("connect", async function () {
                    this.conexion.on("tokens-updated-" + this.userId, this.getContacts.bind(this));
                }.bind(this));
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    private async getContacts() {
        try {
            this.requiredPermission = false;
            this.user = await this.http.get(`/user/${this.userId}`).toPromise();
            console.log(this.user);
            if (this.user.email.includes("@gmail.com")) {
                if (this.user.hasOwnProperty("tokensGoogle")) {
                    this.contacts = await this.http.get(`/google/contacts/${this.userId}`).toPromise() as any;
                } else {
                    this.requiredPermission = true;
                }
            } else if (this.user.email.includes("@yahoo")) {
                if (this.user.hasOwnProperty("tokensYahoo")) {
                    this.contacts = await this.http.get(`/yahoo/contacts/${this.userId}`).toPromise() as any;
                } else {
                    this.requiredPermission = true;
                }
            }
            this.zone.run(function () { console.log("updated"); })
            console.log(this.contacts);
        }
        catch (e) {
            console.error(e);
        }
    }

    private async getPlayers() {
        try {
            for (let role of this.user.roles) {
                if (role.name === "Manager" && Object.prototype.toString.call(role.team) === "[object Object]") {
                    this.teams.push(role.team);
                }
            }
            for (let id of this.teams) {
                let players = await this.http.get(`/players?where={"team":"${id}"}`).toPromise() as any[];
                players = players.filter(it => { return Object.prototype.toString.call(it.user) === "[object Object]" })
                this.players = players.concat(this.players);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    private async initConnetionSockets() {
        try {
            //Primero obtenemos el script de websocket
            let script = await this.http.get("/script/socket", { responseType: "text" }).toPromise() as string;
            new Function(script)();
            let user = this.auth.getLoginData();
            io.sails.query = `user=${user.id}&token=${user.token}`;
            this.conexion = io.sails.connect(Interceptor.url, { reconnection: true });
            this.conexion.on("connect", async function () {
                this.conexion.on("tokens-updated-" + this.userId, this.getContacts.bind(this));
            }.bind(this));
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

    public toAddContact() {
        this.router.navigate([`/contacts/add`])
    }

    public async sendPermission() {
        try {
            let link: any = await this.http.get(`/google/url-auth`).toPromise();
            window.location.href = link.url;
        }
        catch (e) {
            console.error(e);
        }
    }

    public viewContact(i: number) {
        const modalRef = this.modal.open(ViewContact);
        modalRef.componentInstance.contact = this.contacts.connections[i];
        modalRef.componentInstance.userId = this.userId;
        modalRef.componentInstance.getContactsExterior = this.getContacts.bind(this);
        modalRef.componentInstance.getContacts = this.getContacts.bind(this);
        console.log(this.isPlayer(this.contacts.connections[i]));
        modalRef.componentInstance.isPlayer = this.isPlayer(this.contacts.connections[i])
    }

    public isPlayer(contact) {
        if (contact.hasOwnProperty("emailAddresses") === false)
            return true;
        return this.players.findIndex(function (it) {
            console.log(it.user.email, contact.emails[0].value)
            return it.user.email === contact.emails[0].value;
        }.bind(this)) !== -1;
    }
}
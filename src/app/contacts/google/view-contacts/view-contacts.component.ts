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
import { ViewContactYahoo } from 'app/contacts/yahoo/view-contact/view-contact.modal';
import { toAddContactModal } from 'app/contacts/toaddcontact/to-add-contact-modal';


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
    public contactsYahoo: { contacts: { contact: any[], count: number, start: number, total: number, uri: string } } = { contacts: { contact: [], count: 0, start: 0, total: 0, uri: "" } };
    public contactsGoogle: { connections: any[], totalItems: Number, totalPeople: number } = { connections: [], totalItems: 0, totalPeople: 0 };
    public requiredPermissionGoogle = false;
    public requiredPermissionYahoo = false;
    public selectsContactsGoogle = [];
    public selectsContactsYahoo = [];
    public importingNow = { isGoogle: false, contact: {}, active: false }
    public validActions = false;

    public search = "";
    public players = [];
    public teams = [];
    public team = "";

    public emailGoogle = "";
    public emailYahoo = "";

    private conexion: any;

    //Para los loadings
    public loadingPorcentage = "0%";

    constructor(private pageTitleService: PageTitleService,
        private auth: AuthenticationService, private fb: FormBuilder,
        private toast: ToastrService, private route: ActivatedRoute,
        private http: HttpClient, private router: Router,
        private zone: NgZone, public modal: NgbModal
    ) {
        this.user = this.auth.getLoginData();
        for (let role of this.user.roles) {
            if (role.name === "Manager" && Object.prototype.toString.call(role.team) === "[object Object]") {
                console.log(role, role.team);
                this.teams.push(role.team);
            }
        }
        console.log(this.teams);
    }

    async ngOnInit() {
        try {
            //cargamos los datos del usuario
            this.user = this.auth.getLoginData();
            this.userId = this.user.id;
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
            this.requiredPermissionGoogle = false;
            this.requiredPermissionYahoo = false;
            this.user = await this.http.get(`/user-all/${this.userId}`).toPromise();
            if (this.user.email.includes("@gmail") || this.user.emailGoogle !== null && this.user.emailGoogle !== undefined) {
                //Nesesitamos obtener el correo
                if (this.user.email.includes("@gmail"))
                    this.emailGoogle = this.user.email;
                else
                    this.emailGoogle = this.user.emailGoogle;

                if (this.user.tokensGoogle !== null && this.user.tokensGoogle !== undefined) {
                    this.contactsGoogle = await this.http.get(`/google/contacts/${this.userId}`).toPromise() as any;
                    this.validActions = true;
                } else {
                    this.requiredPermissionGoogle = true;
                }
            }

            if (this.user.email.includes("@yahoo") || this.user.emailYahoo !== null && this.user.emailYahoo !== undefined) {
                //Nesesitamos obtener el correo
                if (this.user.email.includes("@yahoo"))
                    this.emailYahoo = this.user.email;
                else
                    this.emailYahoo = this.user.emailYahoo;

                if (this.user.tokensYahoo !== null && this.user.tokensYahoo !== undefined) {
                    this.contactsYahoo = await this.http.get(`/yahoo/contacts/${this.userId}`).toPromise() as any;
                    this.validActions = true;
                    console.log(this.contactsYahoo);
                } else {
                    this.requiredPermissionYahoo = true;
                }
            }
            this.zone.run(function () { console.log("updated"); })
        }
        catch (e) {
            console.error(e);
        }
    }

    private async getPlayers() {
        try {
            for (let role of this.user.roles) {
                if (role.name === "Manager" && Object.prototype.toString.call(role.team) === "[object Object]") {
                    this.teams.push(role.team.id);
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

    public validUpdateGoogle() {
        if (this.validEmail(this.emailGoogle) === false) {
            return false;
        }

        if (this.user.email.includes("@gmail"))
            return this.emailGoogle !== this.user.email;
        else
            return this.emailGoogle !== this.user.emailGoogle;
    }

    public validUpdateYahoo() {
        if (this.validEmail(this.emailYahoo) === false) {
            return false;
        }

        if (this.user.email.includes("@yahoo"))
            return this.emailYahoo !== this.user.email;
        else
            return this.emailYahoo !== this.user.emailYahoo;
    }

    public async updateEmailGoogle() {
        try {
            await this.http.put("/google/email", { emailGoogle: this.emailGoogle, userId: this.userId }).toPromise();
            this.getContacts();
        }
        catch (e) {
            console.error(e);
            this.toast.error("Error in update Email Google");
        }
    }

    public async updateEmailYahoo() {
        try {
            await this.http.put("/yahoo/email", { emailYahoo: this.emailYahoo, userId: this.userId }).toPromise();
            this.getContacts();
        }
        catch (e) {
            console.error(e);
            this.toast.error("Error in update Email Yahoo");
        }
    }

    public validEmail(email: string): boolean {
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
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

    public getNameContactYahoo(contact) {
        let name = "", email = "";
        for (let field of contact.fields) {
            if (field.type === "name") {
                name = field.value.givenName + " " + field.value.familyName;
            }
        }
        if (name !== "") return name;
        for (let field of contact.fields) {
            if (field.type === "email") {
                email = field.value;
            }
        }

        return email;
    }

    public errorImage(event) {
        this.image = "/assets/img/user.png";
    }

    public validSameGoogle(ct) {
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
        if (this.validActions === false)
            return;

        let validGoogle = false, validYahoo = false;
        if (this.emailGoogle !== "" &&
            this.requiredPermissionGoogle === false &&
            this.validUpdateGoogle() === false) {
            validGoogle = true;
        }

        if (this.emailYahoo !== "" &&
            this.requiredPermissionYahoo === false &&
            this.validUpdateYahoo() === false) {
            validYahoo = true;
        }

        if (validGoogle === true && validYahoo === false)
            this.router.navigate([`/contacts/add/google`])
        if (validYahoo === true && validGoogle === false)
            this.router.navigate([`/contacts/add/yahoo`])
        if (validGoogle === true && validYahoo === true) {
            let modal = this.modal.open(toAddContactModal);
            modal.componentInstance.toContactGoogle = function () {
                this.router.navigate([`/contacts/add/google`]);
                modal.close();
            }.bind(this);
            modal.componentInstance.toContactYahoo = function () {
                this.router.navigate([`/contacts/add/yahoo`]);
                modal.close();
            }.bind(this);
        }
    }

    public async grantPermissionGoogle() {
        try {
            let link: any = await this.http.get(`/google/url-auth`).toPromise();
            window.location.href = link.url;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async grantPermissionYahoo() {
        try {
            let link: any = await this.http.get(`/yahoo/url-auth`).toPromise();
            window.location.href = link.url;
        }
        catch (e) {
            console.error(e);
        }
    }

    public viewContactGoogle(i: number) {
        const modalRef = this.modal.open(ViewContact);
        modalRef.componentInstance.contact = this.contactsGoogle.connections[i];
        modalRef.componentInstance.userId = this.userId;
        modalRef.componentInstance.getContactsExterior = this.getContacts.bind(this);
        modalRef.componentInstance.getPlayers = this.getPlayers.bind(this);
        modalRef.componentInstance.isPlayer = this.isPlayer(this.contactsGoogle.connections[i])
    }

    public viewContactYahoo(i: number) {
        const modalRef = this.modal.open(ViewContactYahoo);
        modalRef.componentInstance.contact = this.contactsYahoo.contacts.contact[i];
        modalRef.componentInstance.userId = this.userId;
        modalRef.componentInstance.getContactsExterior = this.getContacts.bind(this);
        modalRef.componentInstance.getPlayers = this.getPlayers.bind(this);
        modalRef.componentInstance.isPlayer = this.isPlayerYahoo(this.contactsYahoo.contacts.contact[i])
    }

    public isPlayer(contact) {
        if (contact.hasOwnProperty("emailAddresses") === false)
            return true;

        return this.players.findIndex(function (it) {
            return it.user.email === contact.emailAddresses[0].value;
        }.bind(this)) !== -1;
    }

    public isPlayerYahoo(contact) {
        let valid = false, email = "";
        for (let field of contact.fields) {
            if (field.type === "email") {
                valid = true;
                email = field.value;
                break;
            }
        }
        if (valid === false)
            return false;

        return this.players.findIndex(function (it) {
            return it.user.email === email;
        }.bind(this)) !== -1;
    }

    public selectContactAny(isGoogle, contact) {
        if (isGoogle) {
            this.selectsContactsGoogle.push(contact);
        } else {
            this.selectsContactsYahoo.push(contact);
        }
    }

    public unselectContactAny(isGoogle, contact) {
        if (isGoogle) {
            if (this.selectsContactsGoogle.length > 1) {
                let index = this.selectsContactsGoogle.findIndex(it => {
                    return it.resourceName === contact.resourceName;
                });
                if (index !== -1)
                    this.selectsContactsGoogle.splice(index, 1);
            } else
                this.selectsContactsGoogle = [];
        } else {
            if (this.selectsContactsYahoo.length > 1) {
                let index = this.selectsContactsYahoo.findIndex(it => {
                    return it.resourceName === contact.resourceName;
                });
                if (index !== -1)
                    this.selectsContactsYahoo.splice(index, 1);
            } else
                this.selectsContactsYahoo = [];
        }
    }

    public isSelectAny(isGoogle, contact) {
        let resource: string;
        if (isGoogle === true) {
            resource = contact.resourceName;
            return this.selectsContactsGoogle.findIndex(it => {
                return it.resourceName === resource;
            }) !== -1;
        } else {
            resource = contact.uri;
            return this.selectsContactsYahoo.findIndex(it => {
                return it.uri === resource;
            }) !== -1;
        }
    }

    public async importAsPlayer() {
        try {
            if (this.team === "") {
                return this.toast.error("Select a team");
            }

            for (let contact of this.selectsContactsGoogle) {
                await this.import(true, contact);
            }
            this.selectsContactsGoogle = [];
            for (let contact of this.selectsContactsYahoo) {
                await this.import(false, contact);
            }
            this.selectsContactsYahoo = [];
            this.getPlayers();
        }
        catch (e) {
            console.error(e);
            this.toast.error("Error to import");
        }
    }

    private getRandomPorcentage() {
        return Math.abs(Math.floor(Math.random() * (20 - 90 + 1)) + 10);
    }

    private asyncPorcentage(porcentage: number, current: number) {
        if (porcentage > current) {
            current += 5;
            if (this.importingNow.active === true && this.loadingPorcentage === (current - 5) + "%") {
                this.loadingPorcentage = current.toString() + "%";
                this.setPorcentage();
                setTimeout(this.asyncPorcentage.bind(this), 300, porcentage, current);
            }

        }
    }

    private setPorcentage() {
        let loadings = document.querySelectorAll(".loading-porcentage") as any;
        for (let load of (loadings as HTMLDivElement[])) {
            load.style.width = this.loadingPorcentage;
        }
    }

    private async import(isGoogle, contact) {
        this.loadingPorcentage = "0%";
        this.setPorcentage();
        this.importingNow = { isGoogle, contact, active: true };

        this.asyncPorcentage(this.getRandomPorcentage(), 0);

        if (isGoogle === true) {
            await this.http.post("/google/create-player", { team: this.team, contact }).toPromise();
        } else {
            await this.http.post("/yahoo/create-player", { team: this.team, contact }).toPromise();
        }
        this.loadingPorcentage = "100%"
        this.setPorcentage();

        await new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });

        this.importingNow.active = false;

    }

    public isImporting(isGoogle, contact) {
        if (this.importingNow.active === false)
            return false;

        if (isGoogle === true)
            return (this.importingNow.contact as any).resourceName === contact.resourceName;
        else
            return (this.importingNow.contact as any).uri === contact.uri;
    }
}
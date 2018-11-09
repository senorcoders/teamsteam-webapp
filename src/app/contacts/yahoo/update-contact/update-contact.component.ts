import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { fadeInAnimation } from 'app/core/route-animation/route.animation';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
    selector: 'app-update-contact-yahoo',
    templateUrl: './update-contact.component.html',
    styleUrls: ['./update-contact-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class UpdateContactYahooComponent implements OnInit {

    private userId;
    public user: any = { user: { firstName: "", lastName: "" }, positions: [] };
    public image = "";
    public emails = [];
    public phoneNumbers = [];
    public invalidNumberPhone = false;
    public invalidTypePhone = false;
    public invalidValueEmail = false;
    public invalidTypeEmail = false;

    private isGoogle = true;

    public form: FormGroup;

    private contact: any;
    private uri: string = "";

    constructor(private pageTitleService: PageTitleService,
        private auth: AuthenticationService, private fb: FormBuilder,
        private toast: ToastrService, private route: ActivatedRoute,
        private http: HttpClient, private location: Location
    ) {

    }

    async ngOnInit() {
        try {
            //contruimos el formulario
            this.form = this.fb.group({
                firstname: ['', Validators.required],
                lastname: ["", Validators.required],
                address: ["", Validators.required],
                birthday: [null, Validators.required]
            });

            //cargamos los datos del usuario
            let user = this.auth.getLoginData();
            this.userId = user.id;
            this.uri = this.route.snapshot.queryParams["uri"];
            console.log(this.uri);
            this.user = await this.http.get(`/user/${this.userId}`).toPromise();
            await this.parsecontac();
            this.pageTitleService.setTitle(`Update Contact of ${this.user.firstName} ${this.user.lastName}`);

        }
        catch (e) {
            console.error(e);
        }
    }

    public async parsecontac() {
        try {
            this.contact = await this.http.get(`/yahoo/contact/${this.userId}?uri=${this.uri}`).toPromise();
            console.log(this.contact);
            for (let field of this.contact.contact.fields) {
                if (field.type === "email") {
                    this.emails.push({ type: "email", value: field.value });
                } else if (field.type === "phone") {
                    this.phoneNumbers.push({ type: "phone", value: field.value })
                } else if (field.type === "name") {
                    this.form.patchValue({ firstname: field.value.givenName })
                    this.form.patchValue({ lastname: field.value.familyName })
                } else if (field.type === "birthday") {
                    let date = field.value;
                    let da = moment(date.year + "/" + date.month + "/" + date.day, "YYYY/MM/DD")
                    this.form.patchValue({ birthday: da.format("YYYY-MM-DD") })
                }else if(field.type==="address"){
                    this.form.patchValue({address: field.value.street });
                }
            }
        }
        catch (e) {
            this.toast.error("Unexpected Error")
        }
    }

    public addPhone() {
        let numberPhone = (window as any).numberPhone.value;
        if (numberPhone === "") {
            this.invalidNumberPhone = true;
            setTimeout(function () {
                this.invalidNumberPhone = false;
            }.bind(this), 1500);
            return;
        }

        this.phoneNumbers.push({
            value: numberPhone,
            type: "phone"
        });

        (window as any).numberPhone.value = "";

        // console.log(this.phoneNumbers);
    }

    public removePhone(i: number) {
        if (this.phoneNumbers.length === 1) {
            this.phoneNumbers = [];
        } else {
            this.phoneNumbers.splice(i, 1);
        }
    }

    public addEmail() {
        let value = (window as any).valueEmail.value;
        if (value === "") {
            this.invalidValueEmail = true;
            setTimeout(function () {
                this.invalidValueEmail = false;
            }.bind(this), 1500);
            return;
        }

        this.emails.push({
            value,
            type: "email",
        });

        (window as any).valueEmail.value = "";

        // console.log(this.emails);
    }

    public removeEmail(i: number) {
        console.log(i);
        if (this.emails.length === 1) {
            this.emails = [];
        } else {
            this.emails.splice(i, 1);
        }
    }

    public async updateContact() {
        try {

            if (this.phoneNumbers.length === 0 && this.emails.length === 0) {
                this.toast.error("You have to add a phone number or email");
                return;
            }

            let values = this.form.value;
            if (values.firstname === "") {
                return this.toast.error("The First Name field is Empty");
            } else if (values.lastname === "") {
                return this.toast.error("The Last Name field is Empty");
            }
            console.log(this.contact.contact.uri);
            let person: any = {
                "userId": this.userId,
                "uri": this.contact.contact.uri,
                "contact": {
                    "contact": {
                        "fields": [
                            {
                                "type": "name", "value": {
                                    "givenName": values.firstname,
                                    "middleName": "",
                                    "familyName": values.lastname,
                                    "prefix": "",
                                    "suffix": "",
                                    "givenNameSound": "",
                                    "familyNameSound": ""
                                }
                            }
                        ]
                    }
                }
            }
            let birthday: moment.Moment;
            if (values.birthday !== null && values.birthday !== "") {
                birthday = moment(values.birthday, "YYYY/MM/DD");
                let birth = {
                    "type": "birthday", "value": {
                        "day": birthday.format("DD"),
                        "month": birthday.format("MM"),
                        "year": birthday.format("YYYY")
                    }
                }
                person.contact.contact.fields.push(birth);
            }
            if (values.address !== "") {
                person.contact.contact.fields.push({
                    "type": "address", "value": {
                        "street": values.address,
                    }
                });
            }
            person.contact.contact.fields = this.phoneNumbers.concat(this.emails).concat(person.contact.contact.fields);

            await this.http.put("/yahoo/contacts", person).toPromise();
            this.location.back();
        }
        catch (e) {
            console.error(e);
            this.toast.error("Unexpected Error");
        }
    }

}
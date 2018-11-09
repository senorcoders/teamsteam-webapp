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
    selector: 'app-add-contact-yahoo',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class AddContactYahooComponent implements OnInit {

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
            this.user = await this.http.get(`/user/${this.userId}`).toPromise();
            console.log(this.user);
            this.pageTitleService.setTitle(`Add Contact to ${this.user.firstName} ${this.user.lastName}`);

            if (this.user.email.includes("@yahoo"))
                this.isGoogle = false;

        }
        catch (e) {
            console.error(e);
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

    public async addContact() {
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
            let person: any = {
                "userId": this.userId,
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

            await this.http.post("/yahoo/contacts", person).toPromise();
            this.location.back();
        }
        catch (e) {
            console.error(e);
            this.toast.error("Unexpected Error");
        }
    }

}
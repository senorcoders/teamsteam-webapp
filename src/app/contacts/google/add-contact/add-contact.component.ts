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
    selector: 'app-add-contact-google',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class AddContactGoogleComponent implements OnInit {

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
        let typePhone = (window as any).typePhone.value;
        if (numberPhone === "") {
            this.invalidNumberPhone = true;
            setTimeout(function () {
                this.invalidNumberPhone = false;
            }.bind(this), 1500);
            return;
        }
        if (typePhone === "" || typePhone === "type") {
            this.invalidTypePhone = true;
            setTimeout(function () {
                this.invalidTypePhone = false;
            }.bind(this), 1500);
            return;
        }


        if (this.phoneNumbers.length === 0) {
            this.phoneNumbers.push({
                value: numberPhone,
                type: typePhone,
                "metadata": {
                    "primary": true,
                    "verified": true
                }
            })
        } else {
            this.phoneNumbers.push({
                value: numberPhone,
                type: typePhone,
                "metadata": {
                    "primary": false,
                    "verified": true
                }
            })
        }
        (window as any).numberPhone.value = "";
        (window as any).typePhone.value = "type";

        // console.log(this.phoneNumbers);
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

    public removePhone(i: number) {
        if (this.phoneNumbers.length === 1) {
            this.phoneNumbers = [];
        } else {
            this.phoneNumbers.splice(i, 1);
        }
    }

    public addEmail() {
        let value = (window as any).valueEmail.value;
        let type = (window as any).typeEmail.value;
        if (value === "") {
            this.invalidValueEmail = true;
            setTimeout(function () {
                this.invalidValueEmail = false;
            }.bind(this), 1500);
            return;
        }
        if (type === "" || type === "type") {
            this.invalidTypeEmail = true;
            setTimeout(function () {
                this.invalidTypeEmail = false;
            }.bind(this), 1500);
            return;
        }


        if (this.emails.length === 0) {
            this.emails.push({
                value,
                type,
                "metadata": {
                    "primary": true,
                    "verified": true
                }
            })
        } else {
            this.emails.push({
                value,
                type,
                "metadata": {
                    "primary": false,
                    "verified": true
                }
            })
        }
        (window as any).valueEmail.value = "";
        (window as any).typeEmail.value = "type";

        // console.log(this.emails);
    }

    public getTypeEmail(value: string) {
        let def = {
            home: "Home",
            work: "Work",
            other: "Other"
        };

        return def[value];
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
                "userID": this.userId,
                "person": {
                    "names": [
                        {
                            "givenName": values.firstname + " " + values.lastname,
                            "metadata": {
                                "primary": true,
                                "verified": true
                            }
                        }
                    ],
                    "addresses": [
                        {
                            "metadata": {
                                "primary": true,
                                "verified": true
                            },
                            "type": "home",
                            "extendedAddress": values.address,
                        }
                    ],
                    "emailAddresses": this.emails,
                    "phoneNumbers": this.phoneNumbers
                }
            };
            let birthday:moment.Moment;
            if (values.birthday !== null && values.birthday !== "") {
                birthday = moment(values.birthday, "YYYY/MM/DD");
                person.person.birthdays = [
                    {
                        "metadata": {
                            "primary": true,
                            "verified": true
                        },
                        "date": {
                            "year": birthday.format("YYYY"),
                            "month": birthday.format("MM"),
                            "day": birthday.format("DD")
                        },
                        "text": birthday.toISOString()
                    }
                ];
            }
            await this.http.post("/google/contact/create", person).toPromise();
            this.location.back();
        }
        catch (e) {
            console.error(e);
            this.toast.error("Unexpected Error");
        }
    }

}
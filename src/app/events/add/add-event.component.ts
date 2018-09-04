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

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class AddEventComponent implements OnInit {

    form: FormGroup;
    teams = [];
    userData: any;
    currentDate = new Date();
    players: any;
    CurrentTime: any;
    public repeats = false;
    public repeatsDaily = false;
    public searchPlayer = false;
    public repeatsDays = [];
    public searchPlayers = [];

    public lat = 0;
    public lng = 0;
    private changeLocation = false;

    public imgSrc = "/assets/img/add-image.png";
    private changeImg = false

    public showLoading = false;

    public myDatePickerOptions: INgxMyDpOptions = {
        dateFormat: 'mm.dd.yyyy',
        alignSelectorRight: true,
        disableUntil: {
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth() + 1,
            day: this.currentDate.getDate() - 1,
        }
    };

    constructor(private pageTitleService: PageTitleService, private fb: FormBuilder,
        private team: TeamService, private auth: AuthenticationService,
        public http: HttpClient, public toastr: ToastrService
    ) {
    }

    async ngOnInit() {
        this.pageTitleService.setTitle("Events");
        this.userData = this.auth.getLoginData();
        this.getTeams()
        this.form = this.fb.group({
            team: ["", Validators.required],
            name: ['', Validators.required],
            type: ['', Validators.required],
            date: [moment().format('YYYY-MM-DD'), Validators.required],
            time: [moment().format("HH:mm:ss"), Validators.required],
            dateTimeEnd: [null, Validators.nullValidator],
            description: ["", Validators.nullValidator],
            percentageNotification: [0, Validators.nullValidator],
            address: ["", Validators.nullValidator],
            locationDetail: ["", Validators.nullValidator],
            locationLink: ["", Validators.nullValidator]
        });

        try {
            let position = await this.findMe() as any;
            let { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            this.lat = latitude;
            this.lng = longitude;
        }
        catch (e) {
            console.error(e);
        }

    }

    private findMe() {
        return new Promise((resolve, reject) => {
            try {

                let idE = setTimeout(function () {
                    reject("not premission")
                }, 3000);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        clearTimeout(idE);
                        resolve(position);
                    });
                } else {
                    reject("Geolocation is not supported by this browser.");
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }

    public selectDay(key: string) {

        let index = this.repeatsDays.findIndex(function (el) { return el === key });
        console.log(index, key);
        if (index === -1)
            this.repeatsDays.push(key);
        else {

            if (this.repeatsDays.length === 1)
                this.repeatsDays = [];
            else
                this.repeatsDays.splice(index, 1);

        }

    }

    public getSelectDays(key: string) {
        return -1 !== this.repeatsDays.findIndex(function (el) { return el === key });
    }

    public repeatsDaysValid() {
        if (this.repeats === false) return true;
        return this.repeats === true && this.repeatsDaily !== false
    }

    public onChange(e) {
        this.repeats = e;
    }

    public onChangeDaily(e) {
        this.repeatsDaily = e;
    }

    public onChangePlayer(e) {
        this.searchPlayer = e;
    }

    public addPosition() {
        this.searchPlayers.push("");
    }

    public trackByIndex(index: number) {
        return index;
    }

    public placeMarker($event) {
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
        this.changeLocation = true;
    }

    public addImage() {
        let input = document.getElementById("inputFile") as HTMLInputElement;
        input.click();
    }

    public uploadImage(files) {
        var reader = new FileReader();

        reader.onloadend = function () {
            this.imgSrc = reader.result;
            this.changeImg = true;
        }.bind(this);

        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    }

    public async saveEvent() {
        try {

            this.showLoading = true;

            let event = this.form.value;
            event.dateTime = moment(event.date + " " + event.time, 'YYYY-MM-DD ' + "HH:mm:ss").toISOString();

            if (event.percentageNotification > 100) {
                event.percentageNotification = 100;
            }
            if (event.percentageNotification < 0) {
                event.percentageNotification = 0;
            }

            //create el object fo send to location event
            let locate: any;
            if (this.changeLocation === false) {
                locate = {};
            } else {
                locate = { lat: this.lat, lng: this.lng };
            }

            locate.address = event.address;
            locate.link = event.locationLink || "";
            locate.detail = event.locationDetail || "";

            event.location = locate;

            let searchPlayers = this.searchPlayers.join(",");
            if (event.searchPlayer === true) {
                event.searchPlayers = searchPlayers;
            }

            if (event.dateTimeEnd !== null) {
                event.dateTimeEnd = moment(event.dateTimeEnd, "HH:mm:ss").toISOString()
            }

            event.repeats = this.repeats;
            event.repeatsDaily = this.repeatsDaily;
            if (this.repeats === true && this.repeatsDaily === false) {
                if (this.repeatsDays.length === 0) {
                    this.showError("Event days are required");
                    return;
                }
                event.repeatsDays = this.repeatsDays.join(",");
            }
            event.user = this.userData.id;
            console.log(event);

            event = await this.http.post("/event", {
                event
            }).toPromise();

            if (this.changeImg !== false) {
                await this.http.post("/images/events", { id: event.id, image: this.imgSrc }).toPromise();
            }

            this.imgSrc = "/assets/img/add-image.png";;
            this.changeImg = false;
            this.searchPlayer = false;
            this.searchPlayers = [];
            this.repeats = false;
            this.repeatsDaily = false;
            this.repeatsDays = [];
            this.form.reset();
            this.form.patchValue({
                date: moment().format('YYYY-MM-DD'),
                time: moment().format("HH:mm:ss")
            });
            this.showSuccess();
        }
        catch (e) {
            console.error(e);
            this.showError(e);
        }
    }

    //get teams by current user only is user is manager
    private async getTeams() {
        let teams = await this.http.get(`/roles?where={"name":"Manager","user":"${this.userData.id}"}`).toPromise() as any[];
        this.teams = teams.filter(it => {
            return it.team !== undefined;
        });

    }

    showError(e) {
        this.showLoading = false;
        this.toastr.error(e, 'Error', { positionClass: "toast-top-right" });
    }

    showSuccess() {
        this.showLoading = false;
        this.toastr.success('Well Done', 'Your event was added Successfully', { positionClass: "toast-top-right" });
    }

}

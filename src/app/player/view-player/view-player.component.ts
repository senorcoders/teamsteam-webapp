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
    selector: 'app-view-player',
    templateUrl: './view-player.component.html',
    styleUrls: ['./view-player.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class ViewPlayerComponent implements OnInit {

    private playerID;
    public player: any = { user: { firstName: "", lastName: "" }, positions: [] };
    public image = "";
    public validContacts = false;

    constructor(private pageTitleService: PageTitleService, private team: TeamService,
        private auth: AuthenticationService, private fb: FormBuilder,
        private toast: ToastrService, private route: ActivatedRoute,
        private http: HttpClient, private router: Router
    ) {

    }

    async ngOnInit() {
        try {
            this.playerID = this.route.snapshot.params["id"];
            this.player = await this.http.get(`/players/${this.playerID}`).toPromise();
            if (this.player.user.email.includes("@gmail.com") || this.player.user.email.includes("@yahoo")) {
                this.validContacts = true;
            }
            this.pageTitleService.setTitle("View Player");
            this.image = Interceptor.transformUrl(`/userprofile/images/${this.player.user.id}/${this.player.team.id}`);
        }
        catch (e) {
            console.error(e);
        }
    }

    public errorImage(event) {
        this.image = "/assets/img/user.png";
    }

    public toFormatDate(birthDay) {
        return moment(birthDay).format("MM/DD/YYYY");
    }


    public toContacts(e) {
        this.router.navigate([`/player/view/contacts/${this.player.user.id}/${this.player.team.id}`])
        e.stopPropagation();
        return false;
    }
}
import { Component, OnInit, ViewChild, ElementRef,  ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { ToastrService } from 'ngx-toastr';
import { Interceptor } from '../../interceptor/interceptor';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
	selector: 'app-list-league',
	templateUrl: './list-league.component.html',
	styleUrls: ['./list-league.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class ListLeagueComponent implements OnInit {

    public leagues:any[]=[];
    public showNotLeague=false;

    constructor(
        public http:HttpClient, public auth:AuthenticationService
    ){

    }

    async ngOnInit(){
        let user = this.auth.getLoginData();
        await this.http.get(`/roles?where={"name":"OwnerLeague","user":"${user.id}"}`).subscribe(leagues=>{
            this.leagues = (leagues as any[]).map(it=>{
                it.league.imgSrc = Interceptor.url+ "/images/ramdon/leagues/"+ it.league.id;
                return it;
            });

            this.showNotLeague = this.leagues.length === 0;
        });
    }

    public errorHandler(event) {
		event.target.src = "/assets/img/logo-icon.png";
	}
}
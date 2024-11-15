import {Component, OnInit, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import {Interceptor} from '../../interceptor/interceptor';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {environment} from 'environments/environment';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-list-league',
  templateUrl: './list-league.component.html',
  styleUrls: ['./list-league.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class ListLeagueComponent implements OnInit {
  public leagues: any = [];
  public showNotLeague = false;
  public superadminShow = false;

  constructor(
    public http: HttpClient,
    public auth: AuthenticationService,
    private team: TeamService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const user = this.auth.getLoginData();
    environment.superadmin.forEach((data) => {
      if (user.email === data) {
        this.team.getLeagues().subscribe(result => {
          this.leagues = result;
        })
        this.superadminShow = true;
      }
    })
    if (this.superadminShow === false) {
      const routeEnd = `/roles?where={"name":"OwnerLeague","user":"${user.id}"}`;
      await this.http.get(routeEnd).subscribe(leagues => {
        const cLeagues: any = leagues;
        if (cLeagues.length === 0) {
          this.showNotLeague = true;
        }
        this.leagues = (leagues as any[]).map(it => {
          it.league.imgSrc = Interceptor.url + '/images/ramdon/leagues/' + it.league.id;
          return it;
        });
      });
    }
  }

  public errorHandler(event): void {
    event.target.src = '/assets/img/logo-icon.png';
  }

  public showPopUp(index: number): void {}
}

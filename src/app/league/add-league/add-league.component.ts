import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddTeamModal} from '../add-team-modal/add-team-modal';
import {AddOwnerModal} from '../add-owner-modal/add-owner-modal';
import {PageTitleService} from '../../core/page-title/page-title.service';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class AddLeagueComponent implements OnInit {

  public form: FormGroup;
  public teams = [];
  public owners = [];
  public description = '';
  public showLoading = false;

  constructor(
    public http: HttpClient,
    public auth: AuthenticationService,
    public toastCtrl: ToastrService,
    public fb: FormBuilder,
    public ngbModal: NgbModal,
    private pageTitleService: PageTitleService
  ) {

  }

  async ngOnInit() {
    this.pageTitleService.setTitle('Create League');
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: ['']
    });
  }

  public errorHandler(event) {
    event.target.src = '/assets/img/logo-icon.png';
  }

  public addTeam() {
    const modalRef = this.ngbModal.open(AddTeamModal);
    modalRef.componentInstance.teamsSelect = this.teams;
  }

  public removeTeam(team) {
    const index = this.teams.findIndex(it => {
      return it.id === team.id;
    });
    if (index !== -1) {
      if (this.teams.length === 1) {
        this.teams = [];
      } else {
        this.teams.splice(index, 1);
      }
    }
  }

  public addOwner() {
    const modalRef = this.ngbModal.open(AddOwnerModal);
    modalRef.componentInstance.ownersSelect = this.owners;
  }

  public removeOwner(owner) {
    const index = this.owners.findIndex(it => {
      return it.id === owner.id;
    });
    if (index !== -1) {
      if (this.owners.length === 1) {
        this.owners = [];
      } else {
        this.owners.splice(index, 1);
      }
    }
  }

  public loadImage(t) {
    t.loadImage = true;
  }

  public async saveLeague() {
    this.showLoading = true;
    const user = this.auth.getLoginData();
    this.owners.push(user);
    const owners = [];
    for (const ow of this.owners) {
      const index = owners.findIndex(it => {
        return it.id === ow.id;
      });
      if (index === -1) {
        owners.push(ow);
      }
    }

    let league: any = {
      name: this.form.value.name,
      description: this.description,
      teams: this.teams,
      owners: owners
    };

    try {
      league = await this.http.post('/league/new', league).toPromise() as any;
      this.form.reset();
      this.description = '';
      this.teams = [];
      this.owners = [];
    } catch (e) {
      console.error(e);
    }

    this.showLoading = false;
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-roster',
  templateUrl: './add-roster.component.html',
  styleUrls: ['./add-roster.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class AddRosterComponent implements OnInit {

  public teams: Array<any> = [];
  public template: FormGroup;
  private enableUpload = false;
  public team = '';
  public file: File;
  public showLoading = false;
  isSaving = false;

  constructor(
    private pageTitleService: PageTitleService,
    private fb: FormBuilder,
    private teamService: TeamService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    private router: Router,
    public http: HttpClient
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Upload Roster');
    this.getTeams();
    if (!this.auth.isLogged()) {
      this.router.navigate(['/']).then();
    }
  }

  public async uploadTemplate(): Promise<void> {
    if (this.template.invalid) {
      return;
    }

    const data = localStorage.getItem('sessionToken');

    if (data && this.enableUpload === true && this.team !== '') {
      this.isSaving = true;
      this.showLoading = true;
      const fd = new FormData();
      fd.append('roster', this.file);
      const json = JSON.parse(data);
      const token = json['token'];

      const httpOptionsForm: any = {headers: new HttpHeaders()};
      httpOptionsForm.headers.append('Content-Type', 'multipart/form-data');
      httpOptionsForm.headers.append('token', token);

      this.http.post('/roster/' + this.team + '?token=' + token, fd, httpOptionsForm).subscribe({
        next: (res): void => {
          this.isSaving = false;
          if (res.hasOwnProperty('msg') && (res as any).msg === 'success') {
            this.showSuccess();
            this.template.reset();
          } else {
            this.showError('Error in process');
          }
        },
        error: (err): void => {
          this.showError(err);
          this.isSaving = false;
        }
      });
    }
  }

  public getFile(files: FileList): void {
    if (files.length > 0) {
      this.enableUpload = true;
      this.file = files[0];
    } else {
      this.enableUpload = false;
    }
  }

  public downloadTemplateCSV(): void {
    window.open('https://api.lockerroomapp.com/roster/template-csv');
  }

  public downloadTemplateXLSX(): void {
    window.open('https://api.lockerroomapp.com/roster/template-xlsx');
  }

  public downloadTemplateCSVEmail(): void {
    window.open('https://api.lockerroomapp.com/roster/template-csv-email');
  }

  public downloadTemplateXLSXEmail(): void {
    window.open('https://api.lockerroomapp.com/roster/template-xlsx-email');
  }

  private createForm(): void {
    this.template = new FormGroup({
      roster: new FormControl(),
      team: new FormControl('', [Validators.required])
    });
  }

  private getTeams(): void {
    const user = this.auth.getLoginData();
    this.teamService.getMyTeamsForUser(user.id).subscribe({
      next: (data): void => {
        const teams = data as any;
        teams.forEach(team => {
          if (team.team) {
            this.teams.push(team);
          }
        });
      },
      error: (err): void => {
        console.log(err);
      }
    });
  }

  private showError(e): void {
    this.showLoading = false;
    this.toastr.error(e, 'Error', {positionClass: 'toast-top-right'});
  }

  private showSuccess(): void {
    this.showLoading = false;
    this.toastr.success('Well Done', 'Your roster was added Successfully', {positionClass: 'toast-top-right'});
  }
}

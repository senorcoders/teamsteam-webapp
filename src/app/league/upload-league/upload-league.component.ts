import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TeamService } from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { Router } from '@angular/router';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Interceptor } from '../../interceptor/interceptor';
@Component({
  selector: 'app-upload-league',
  templateUrl: './upload-league.component.html',
  styleUrls: ['./upload-league.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class UploadLeagueComponent implements OnInit {

  public teams: Array<any> = [];
  public template: FormGroup;
  private enableUpload = false;
  public file: File;
  public showLoading = false;

  constructor(
    private pageTitleService: PageTitleService,
    private fb: FormBuilder,
    private teamservice: TeamService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    private router: Router,
    public http: HttpClient
  ) {
    this.createForm();
  }

  createForm() {
    this.template = new FormGroup({
      league: new FormControl()
    });
  }

  ngOnInit() {
    this.pageTitleService.setTitle('Upload League');
    this.getTeams();
    if (!this.auth.isLogged()) {
      this.router.navigate(['/']).then();
    }
  }

  private getTeams() {
    let user = this.auth.getLoginData();
    this.teamservice.getMyTeamsForUser(user.id).subscribe(
      data => {
        console.log(data);
        this.teams = data as any;
      },
      error => {
        console.log(error)
      }
    )
  }

  public async uploadTemplate() {

    if (this.enableUpload === true) {
      this.showLoading = true;
      let fd = new FormData();
      fd.append("league", this.file);

      //Obtener el id del user
      let user = this.auth.getLoginData();

      let httpOptionsForm: any = { headers: new HttpHeaders() };
      httpOptionsForm.headers.append('Content-Type', 'multipart/form-data');

      try {
        let res = await this.http.post('/league/upload/' + user.email, fd, httpOptionsForm).toPromise();
        console.log(res);
        if (res.hasOwnProperty('msg') && (res as any).msg === 'success') {
          this.showSuccess();
        } else {
          this.showError("Error in process");
        }
      }
      catch (e) {
        console.error(e);
        this.showError(e);
      }

    }

  }

  public getFile(files: FileList) {
    if (files.length > 0) {
      this.enableUpload = true;
      this.file = files[0];
    } else {
      this.enableUpload = false;
    }
  }

  showError(e) {
    this.showLoading = false;
    this.toastr.error(e, 'Error', { positionClass: "toast-top-right" });
  }

  showSuccess() {
    this.showLoading = false;
    this.toastr.success('Well Done', 'Your roster was added Successfully', { positionClass: "toast-top-right" });
  }

  //   public downloadTemplateCSV(){
  //     window.open("https://api.lockerroomapp.com/roster/template-csv");
  //   }

  public downloadTemplateXLSX() {
    window.open(Interceptor.url + "/league/template");
  }

  //   public downloadTemplateCSVEmail(){
  //     window.open("https://api.lockerroomapp.com/roster/template-csv-email");
  //   }

  //   public downloadTemplateXLSXEmail(){
  //     window.open("https://api.lockerroomapp.com/roster/template-xlsx-email");
  //   }

}

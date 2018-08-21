import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TeamService } from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { Router } from '@angular/router';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-roster',
  templateUrl: './add-roster.component.html',
  styleUrls: ['./add-roster.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class AddRosterComponent implements OnInit {

  public teams: Array<any> = [];
  public template: FormGroup;
  private enableUpload = false;
  public team = "";
  public file: File;
  public showLoading=false;

  constructor(private pageTitleService: PageTitleService, private fb: FormBuilder,
    private teamservice: TeamService, private toastr: ToastrService,
    private auth: AuthenticationService, private router: Router,
    public http: HttpClient
  ) {
    this.createForm();
  }

  createForm() {
    this.template = new FormGroup({
      roster: new FormControl(),
      team: new FormControl()
    });
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Upload Roster");
    this.getTeams();
    if (!this.auth.isLogged()) {
      this.router.navigate(["/"])
    }
  }

  private getTeams() {
    let user = this.auth.getLoginData();
    console.log(user);
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
    let data = localStorage.getItem('sessionToken');

    if (data && this.enableUpload === true && this.team !== "") {
      this.showLoading = true;
      let fd = new FormData();
      fd.append("roster", this.file); console.log(fd);
      let json = JSON.parse(data);
      let token = json['token'];

      let httpOptionsForm: any = { headers: new HttpHeaders() };
      httpOptionsForm.headers.append('Content-Type', 'multipart/form-data');
      httpOptionsForm.headers.append('token', token);

      this.http.post("https://api.lockerroomapp.com/roster/" + this.team+"?token="+token, fd, httpOptionsForm).subscribe(res => {
        if (res.hasOwnProperty("msg") && (res as any).msg === "success") {
          this.showSuccess();
        }else{
          this.showError("Error in process");
        }
      }, this.showError);

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

  public downloadTemplateCSV(){
    window.open("https://api.lockerroomapp.com/roster/template-csv");
  }

  public downloadTemplateXLSX(){
    window.open("https://api.lockerroomapp.com/roster/template-xlsx");
  }

  public downloadTemplateCSVEmail(){
    window.open("https://api.lockerroomapp.com/roster/template-csv-email");
  }

  public downloadTemplateXLSXEmail(){
    window.open("https://api.lockerroomapp.com/roster/template-xlsx-email");
  }

}

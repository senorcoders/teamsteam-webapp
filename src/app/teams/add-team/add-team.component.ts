import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
	addPlayer:FormGroup;
  teams:any;
  htmlContent:string;
  private base64image:String="";
  preview:string;
  contactEmerg:any=[];
  @ViewChild('contacts') contacts:ElementRef;
  constructor(private pageTitleService: PageTitleService, private fb: FormBuilder,private teamservice: TeamService,private toastr: ToastrService, private auth:AuthenticationService, private router:Router) {
  }
  
  ngOnInit() {
    this.pageTitleService.setTitle("Teams");
  	this.addPlayer=this.fb.group({
  		username:['', Validators.required],
  		firstname:['', Validators.required],
  		lastname:['', Validators.required],
  		birthDay:['', Validators.required],
  		email:['', [Validators.required, Validators.email]],
  		password:['', [Validators.required, Validators.minLength(6)]],
  		gender:['', Validators.required],
  		positions:['', Validators.required],
  		yerseyNumber:['', Validators.required],
      nonPlayer:['', Validators.required],
      managerAccess:['', Validators.required],
      team:['', Validators.required],
      contacts: this.fb.array([ this.createContact() ])
  	});
    this.getTeams();
    if(!this.auth.isLogged()){
      this.router.navigate(["/"])
    }
  }
  getTeams(){
    this.teamservice.getTeams().subscribe(
      data=>{
        this.teams=data;
      },
      error=>{
        console.log(error)
      }
    )
  }
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  showSuccess() {
    this.toastr.success('Well Done', 'Your player was added Successfully',{positionClass:"toast-top-center"});
  }
  /*add contacts Dynamically */
  createContact(): FormGroup {
  return this.fb.group({
    name: '',
    info: '',
    type: '',
  });
}
addItem(): void {
  this.contactEmerg = this.addPlayer.get('contacts') as FormArray;
  this.contactEmerg.push(this.createContact());
}
createPlayer(){
  
}
  uploadImage(event:FileList) {
  let preview = document.querySelector('#previewPlayerImg');
  let file    = event.item(0);
  //to convert base64
  let reader  = new FileReader();
  //to show image
  let reader2  = new FileReader();
  // Client-side validation example
  if (file.type.split('/')[0] !=='image') {
    this.showError('unsupported file type ');
    return;
  }
  reader2.onloadend = function () {
    preview.setAttribute('src',reader2.result);
  }
  if (file) {
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    reader2.readAsDataURL(file);
  }
}
_handleReaderLoaded(readerEvt) {
  let binaryString = readerEvt.target.result;
  this.base64image=btoa(binaryString);
}
}

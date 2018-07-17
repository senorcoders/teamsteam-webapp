import { Component, OnInit, ViewChild,ElementRef, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { Router } from '@angular/router';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
        "[@fadeInAnimation]": 'true'
    },
  animations: [ fadeInAnimation ]
})
export class AddPlayerComponent implements OnInit {
	addUser:FormGroup;
  addPlayer:FormGroup;
  teams:any;
  htmlContent:string;
  private base64image:String="";
  preview:string;
  contactEmerg:any=[];
  showFormUser:boolean=false;
  showFormPlayer:boolean=false;
  users:any;
  findUser:boolean=false;
  noFindUser:boolean=false;
  showPlayerFields:boolean=false;
  userID:any;
  @ViewChild('contacts') contacts:ElementRef;
  constructor(private pageTitleService: PageTitleService, private fb: FormBuilder,private teamservice: TeamService,private toastr: ToastrService, private auth:AuthenticationService, private router:Router) {
  }
  createUser(){
    let user={
      "username":this.addUser.get('username').value, 
      "firstName":this.addUser.get('firstname').value, 
      "lastName":this.addUser.get('lastname').value, 
      "password":this.addUser.get('password').value,
      "email":this.addUser.get('email').value,
      "contacts":this.addUser.get('contacts').value
    }
    let player={
          'team':this.addUser.get('team').value,
          'birthDay':this.addUser.get('birthDay').value,
          'yerseyNumber':this.addUser.get('yerseyNumber').value,
          'gender':this.addUser.get('gender').value,
          'nonPlayer':this.addUser.get('nonPlayer').value,
          'managerAccess':this.addUser.get('managerAccess').value,
          'positions':[this.addUser.get('positions').value]
        }
    this.teamservice.createPlayer(user,player).subscribe(
      result=>{
        if(this.base64image!=""){
          let image={'id':result['id'],'image':this.base64image}
          this.teamservice.uploadImage(image).subscribe(
            data=>{
              this.showSuccess();
            },
            error=>{
              this.showError(error)
            }
          )
        }
        else{
          this.showSuccess();
        }
      },
      e=>{
        this.showError('Something wrong happened. Please try again')
        console.log(e)
      }
    )
  }
  checkUser(email){
    this.teamservice.getData(`user?where={"email":{"like":"${email}"}}`).subscribe(
      result=>{
        if(result && result['length']>0){
          this.users=result
          this.userID=result[0].id;
          this.findUser=true;
          this.noFindUser=false
          this.showPlayerFields=true
        }
        else{
          this.showPlayerFields=false
          this.noFindUser=true;
          this.findUser=false
        }
      },e=>{
        this.noFindUser=true;
        this.findUser=false
        this.showPlayerFields=false
        console.log(e)
      }
    )
  }
  newPlayer(val){
    //create a player
    if(val==1){
      this.showFormPlayer=true;
      this.showFormUser=false;
      this.addPlayer=this.fb.group({
        user:['', Validators.required],
        birthDay:['', Validators.required],
        gender:['', Validators.required],
        positions:['', Validators.required],
        yerseyNumber:['', Validators.required],
        nonPlayer:['', Validators.required],
        managerAccess:['', Validators.required],
        team:['', Validators.required]
      })
    }
    //create a user and player
    else if(val==2){
      this.showFormUser=true;
      this.showFormPlayer=false
    }
    else{
     this.showFormUser=false
     this.showFormPlayer=false
    }
  }
  //add an user to player
  savePlayer(){
    let player={
      'team':this.addPlayer.get('team').value,
      'birthDay':this.addPlayer.get('birthDay').value,
      'yerseyNumber':this.addPlayer.get('yerseyNumber').value,
      'gender':this.addPlayer.get('gender').value,
      'nonPlayer':this.addPlayer.get('nonPlayer').value,
      'managerAccess':this.addPlayer.get('managerAccess').value,
      'positions':[this.addPlayer.get('positions').value],
      'user':this.userID
    }
    this.teamservice.saveData('players/',player).subscribe(
      result=>{
        //add role to the user.
        let name;
        if(result['managerAccess']){
          name="Manager"
        }
        else{name="Player"}
        let data={
          team:result['team'],
          user:result['user'],
          name: name
        }
        this.teamservice.saveData('roles/',data).subscribe(
          result=>{
            this.showSuccess();
            console.log(result)
          },
          e=>{
            this.showError('Something wrong happened, Please try againg');
          }
        )
      },
      e=>{
        console.log()
        this.showError('Something wrong happened, Please try againg');
      }
    )
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Add Player");
  	this.addUser=this.fb.group({
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
    this.toastr.error(e,'Error',{positionClass:"toast-top-right"});
  }
  showSuccess() {
    this.toastr.success('Well Done', 'Your player was added Successfully',{positionClass:"toast-top-right"});
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
  this.contactEmerg = this.addUser.get('contacts') as FormArray;
  this.contactEmerg.push(this.createContact());
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

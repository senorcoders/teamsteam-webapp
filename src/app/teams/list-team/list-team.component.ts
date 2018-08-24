import { Component, OnInit, ViewChild,ElementRef, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { Interceptor } from '../../interceptor/interceptor';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})

export class ListTeamComponent implements OnInit {
  @ViewChild('teamImage') teamImage: ElementRef;
  editTeamForm: FormGroup;
	teams:any[]=[];
  endpoint:string;
  selectedTeam:any;
  sports:any;
  teamRoster:any;
  team_id: number;
  new_image: string;

	constructor(private imageupload: ImageUploadService, private fb: FormBuilder, private teamservice: TeamService,private toastr: ToastrService, private auth:AuthenticationService, private router:Router, private pageTitleService: PageTitleService) {
    // this.teams        = { name: "" };
    this.teamRoster   = {
                          firstName: ""
                        }
    this.selectedTeam = {
                          name: "Select a Team",
                          description: "",
                          city: "",
                          sport: "",
                          teamPicture: ""
                        };
    this.sports       = { 
                          id: 0, 
                          value: ""
                        };
    this.editTeamForm = fb.group({
                          name:  [this.selectedTeam.name, Validators.required],
                          description:  [this.selectedTeam.description, Validators.required],
                          city:  [this.selectedTeam.city, Validators.required],
                          sport:  [this.selectedTeam.sport, Validators.required],
                          teamPicture: [this.selectedTeam.sport, Validators.required],
                        } );
    this.team_id = -1;
    this.new_image = "";
  }
  ngOnInit(){    
    this.endpoint = Interceptor.url; 
    this.getMyTeams();
    this.sports = this.getSports();
    this.pageTitleService.setTitle("Team List");

  }
  chat(team){
    this.selectedTeam = team;
  }
  roster(team){
    this.getRoster(team.id);
    this.selectedTeam = team;
  }
  edit(id,team){
    this.selectedTeam = team;
    this.team_id = id;
  }
  getTeams(){    
  	this.teamservice.getTeams().subscribe(
      data=>{
        this.teams=data as any;
      },
      error=>{
        console.log(error)
      }
    )
  }
  getMyTeams(){
    this.teamservice.getMyTeams().subscribe(
      data=>{
        this.teams=data as any;
      },
      error=>{
        console.log(error)
      }
    )
  }
  getSports(){
    this.teamservice.getSports().subscribe(
      data=>{
        this.sports = data;
      },
      error=>{
        console.log(error)
      }
    )
  }
 
  submitUpdateTeam( updateTeam) {

    let team = {      
      name: updateTeam.name,
      description: updateTeam.description,
      sport: updateTeam.sport
    }
    //this.toastr.success('Well Done', 'Team Updated ' + JSON.stringify(updateTeam.teamPicture), {positionClass:"toast-top-center"});
    let result = this.teamservice.updateTeam(this.selectedTeam.id, team).subscribe(
      data=>{
        //document.getElementById("teamList").innerHTML = ''
        this.teams[this.team_id]= data;
        this.toastr.success('Well Done', 'Team Updated ' , {positionClass:"toast-top-center"});
        
        //if(this.new_image != ""){
          //alert(this.new_image);
          this.imageupload.uploadImage( this.selectedTeam.id ,'teams', this.new_image).subscribe(
              data=> {
                this.toastr.success('Well Done', 'Image Updated' + this.new_image, {positionClass:"toast-top-center"});
              },
              error=>{
                console.log(error);
              }
            )
        //}
        this.selectedTeam = data;
        //this.getMyTeams();
      },
      error=>{
        console.log(error)
      }
    )
      
  }
  deleteTeam(team_id) {
    let result = this.teamservice.deleteTeam(this.selectedTeam.id).subscribe(
      data=>{
        //document.getElementById("teamList").innerHTML = ''
        this.selectedTeam = data;
        //this.getMyTeams();
        this.toastr.success('Well Done', 'The Team has been deleted', {positionClass:"toast-top-center"});
      },
      error=>{
        console.log(error)
      }
    )
  }
  trackByTeams(index: number, team: any): number {return index; }

  getRoster(team_id) {
    this.teamservice.getTeamPlayers(team_id).subscribe(
      data=>{
        this.teamRoster=data;        

      },
      error=>{
        console.log(error)
      }
    )
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      //myReader.readAsDataURL(file);

      reader.readAsDataURL(file);      
      
      reader.onloadend = () => {        
        
        this.teamImage.nativeElement.src = reader.result;

        //event.target.src = reader.result;
        this.new_image = reader.result as any;// reader.result;

      };
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
        //reader2.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    //this.new_image=btoa(binaryString);
  }
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  showSuccess() {
    this.toastr.success('Well Done', 'Your player was added Successfully',{positionClass:"toast-top-center"});
  }
  errorHandler(event, width, height) {
   event.target.src = "http://placehold.it/"+width+"x"+height;
 }
}

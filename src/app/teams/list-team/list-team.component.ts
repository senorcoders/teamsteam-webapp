import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss'],
})
export class ListTeamComponent implements OnInit {
  editTeamForm: FormGroup;
	teams:any;
  endpoint:string;
  selectedTeam:any;
  sports:any;
	constructor(private fb: FormBuilder, private teamservice: TeamService,private toastr: ToastrService, private auth:AuthenticationService, private router:Router) {
    this.teams        = { name: "" };
    this.selectedTeam = {
                          name: "",
                          description: "",
                          city: ""
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
                        } )
  }
  ngOnInit(){    
    this.endpoint = this.auth.getBaseUrl(); 
    this.getMyTeams();
    this.sports = this.getSports();
  }
  chat(team){
    this.selectedTeam = team;
    this.toastr.success('Well Done', 'chat ' + team.name,{positionClass:"toast-top-center"});
  }
  roster(team){
    this.selectedTeam = team;
    this.toastr.success('Well Done', 'roster' + team.name,{positionClass:"toast-top-center"});
  }
  edit(team){
    this.selectedTeam = team;
    this.toastr.success('Well Done', 'Edit' + team.name,{positionClass:"toast-top-center"});
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
  getMyTeams(){
    this.teamservice.getMyTeams().subscribe(
      data=>{
        this.teams=data;
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
  onSubmit(updateTeam) {
  console.log('sdfdfg');
  //console.log(form.value);
  this.toastr.success('Well Done', 'Update 2 ' + updateTeam.sport ,{positionClass:"toast-top-center"});
  }
  submitUpdateTeam(updateTeam) {

    let team = {      
      name: updateTeam.name,
      description: updateTeam.description,
      sport: updateTeam.sport
    }
    this.toastr.success('Well Done', 'Update 1 ' + JSON.stringify(team), {positionClass:"toast-top-center"});
    let result = this.teamservice.updateTeam(this.selectedTeam.id, team);
    this.toastr.success('Well Done', 'Update 4 ' + JSON.stringify(result), {positionClass:"toast-top-center"});
  /* 

    l
    try {
      let newTeam: any = await this.http.put("/teams/" + this.team.id, {
        name: this.name, description: this.description,
        sport: this.sport, city: this.city
      }).toPromise();

      if (this.updateImage === true)
        await this.http.post("/images/teams", { id: newTeam.id, image: this.imageSrc }).toPromise();

      console.log(newTeam);
      load.dismiss();

      if (this.update === true) {
        this.navCtrl.pop();
        return;
      }

      this.navCtrl.setRoot(TeamsProfilePage);
    }
    catch (e) {
      load.dismiss();
      this.alertCtrl.create({ title: "Error", message: undexM, buttons: ["Ok"] });
      console.error(e);
    }
*/
  }
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  showSuccess() {
    this.toastr.success('Well Done', 'Your player was added Successfully',{positionClass:"toast-top-center"});
  }
}
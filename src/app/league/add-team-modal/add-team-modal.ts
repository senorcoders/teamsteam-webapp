import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Interceptor } from '../../interceptor/interceptor';

@Component({
  selector: 'add-team-modal',
  templateUrl: "./add-team-modal.html",
  styleUrls: ["./add-team-modal.scss"]
})
export class AddTeamModal {

  public search="";
  public teams=[];
  public teamsSelect=[];

  constructor(public activeModal: NgbActiveModal,
    public http:HttpClient
  ) {
    
  }

  public async searchTeams(){
    if(this.search===""){
      this.teams=[];
      return;
    }
    this.teams = (await this.http.get(`/teams?where={"name":{"contains":"${this.search}"}}`).toPromise() as any[]).map(it=>{
      it.imgSrc = Interceptor.url+ "/images/random/teams/"+it.id;
      return it;
    }).filter(it=>{
      let index = this.teamsSelect.findIndex(t=>{
        return t.id===it.id;
      })
      return index === -1;
    });
    
  }

  public addTeam(team){
    this.teamsSelect.push(team);
    this.teams = this.teams.filter(it=>{
      let index = this.teamsSelect.findIndex(t=>{
        return t.id===it.id;
      })
      return index === -1;
    });
  }

  public loadImage(team){
    team.loadImage=true;
  }
  
}
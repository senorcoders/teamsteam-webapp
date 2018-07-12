import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {TeamService} from '../../services/team.service';
import {AuthenticationService} from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-form-builder',
  templateUrl: './list-form-builder.component.html',
  styleUrls: ['./list-form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
        "[@fadeInAnimation]": 'true'
    },
  animations: [ fadeInAnimation ]
})
export class ListFormBuilderComponent implements OnInit {
  userData:any;
  teams:any=[];
  forms:any;
  showPopup:boolean=false;
  data:any;
  currentTeam:any;
  noForms:boolean=false;
  showLoading:boolean=false;
  constructor(private pageTitleService: PageTitleService, private team:TeamService, private auth:AuthenticationService, private toast:ToastrService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("List Form Builder");
    this.userData=this.auth.getLoginData();
    this.getTeams()
  }
  getTeams(){
    this.userData.roles.forEach((data)=>{
      if(data.name=="Manager"){
        let val={
          id:data.team.id,
          name:data.team.name
        }
       this.teams.push(val)
      }
    })
  }
  getFormsByTeam(id){
    this.showLoading=true
    this.currentTeam=id
    this.forms=[];
    this.noForms=false
    this.team.getData(`registrationtemplate?where={"team":"${id}"}`).subscribe(
      result=>{
        if(result && result['length']>0){
          this.forms=result
          this.noForms=false
        }
        else{this.noForms=true}
        this.showLoading=false
      },
      e=>{
        console.log(e);
        this.showLoading=false
      }
    )
  }
  showPopUp(i){
    //send data to edit component
    this.data=JSON.stringify(this.forms[i])
    this.showPopup=true
  }
  deleteForm(i){
    let id=this.forms[i].id;
    this.team.deleteData('registrationtemplate/'+id).subscribe(
      result=>{
        this.toast.success('Form was deleted',"Well Done",{positionClass:"toast-top-right"})
        this.getFormsByTeam(this.currentTeam)
      },
      e=>{this.toast.error("Something wrong happened. Please try again","Well Done",{positionClass:"toast-top-center"})}
    )
  }
  closePopUp(){
    this.showPopup=false
    this.getFormsByTeam(this.currentTeam)
  }
}

import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TeamService} from '../../services/team.service';
import {AuthenticationService} from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class ListTaskComponent implements OnInit {
	userData:any;
	teams:any=[];
	showLoading:boolean=false;
	showTask:boolean=false;
	tasks:any;
	noTask:boolean=false;
	showPopup:boolean=false;
	currentTask:any;
	playerInfo:any;
  constructor(private team:TeamService, private auth:AuthenticationService, private toast:ToastrService,
  	private pageTitle:PageTitleService) { }

  ngOnInit() {
  	this.pageTitle.setTitle('List Tasks')
  	this.userData=this.auth.getLoginData();
  	this.userData.roles.forEach((data)=>{
  		if(data.name=="Manager"){
  			this.teams.push(data);
  		}
  	})
  }
  getTaskByTeam(id){
  	this.showLoading=true;
  	//is manager or not
  	this.team.getData(`task/from/${this.userData.id}/${id}`).subscribe(
  		result=>{
			if(result['length']>0){
				this.tasks=result
				this.showLoading=false;
				this.showTask=true
				this.noTask=false
			}
			else{
				this.tasks=result
				this.showLoading=false;
				this.noTask=true
			}
		},
		e=>{
			console.log(e)
			this.showLoading=false
		}
  	)
  }
  	smallDesc(str) {
    	return str.split(/\s+/).slice(0,10).join(" ");
	}
  showPopUp(i){
  	this.currentTask=this.tasks[i];
  	this.getUser(this.currentTask.for);
  }
  closePopUp(){
  	this.showPopup=false
  }
  deleteTask(id, team){
  	this.team.deleteData('task/'+id).subscribe(
  		result=>{
  			this.getTaskByTeam(team);
	      	this.toast.success("Task completed", "Well Done",{positionClass:"toast-top-right"} );
  		},
  		e=>{
			this.toast.success("Something wrong happened. Please try again", "Error",{positionClass:"toast-top-right"} );
  		}
  	)
  }
  markComplete(id,team){
  	let data={
  		completad:true
  	}
  	this.team.editData('task/'+id,data).subscribe(
  		result=>{
  			this.getTaskByTeam(team)
	      	this.toast.success("Task completed", "Well Done",{positionClass:"toast-top-right"} );
	      	this.showPopup=false;
  		},
  		e=>{
	      	this.toast.error("Something wrong happened. Please try again", "Error",{positionClass:"toast-top-right"} );
  		}
  	)
  }
  getUser(val){
  	this.team.getData('user/'+val).subscribe(
  		result=>{
  			this.playerInfo=result
  			this.showPopup=true;
  		}
  	)
  }
  getFullDate(val){
  	let date=new Date(val)
  	return date.toString().split("GMT",1)
  }
  getDay(val){
  	let date= new Date(val);
  	return date.getDate();
  }
  getMonthName(val) {
  	let date= new Date(val)
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[date.getMonth()];
    
}
}

import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TeamService} from '../../services/team.service';
import {AuthenticationService} from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

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
	players:any=[];
	taskForm:FormGroup
	seeTask:boolean=false
	currentDate=new Date();
	showPlayer:boolean=true;
	taskID:any;
	public myDatePickerOptions: INgxMyDpOptions = {
        dateFormat: 'mm.dd.yyyy',
        alignSelectorRight:true,
        disableUntil:{
        	year: this.currentDate.getFullYear(),
		    month: this.currentDate.getMonth()+1,
		    day: this.currentDate.getDate()-1,
        }
    };
  constructor(private team:TeamService, private auth:AuthenticationService, private toast:ToastrService,
  	private pageTitle:PageTitleService, private fb:FormBuilder) { }

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
  getPlayerByTeam(id){
	this.team.getData(`players?where={"team":"${id}"}`).subscribe(
  		result=>{
  			this.showPlayer=true;
        //avoid to add players without user. i was receiving players without user
        let players:any;
        players=result
        players.forEach((data)=>{
          if(data.user && data.user!=''){
            this.players.push(data);
          }
        })
  		},
  		e=>{
  			console.log(e)
	  	}
  	)
  }
  	smallDesc(str) {
      if(str.length>20){
        let text=str.split(/\s+/).slice(0,20).join(" ")
        return text+'...' 
      }
      else{
        return str
      }
	}
	saveTask(){
		let dateTime=this.taskForm.get('dateTime').value;
		let formatDate;
    let date;
		if(dateTime!=''){
			dateTime=dateTime['date']['year']+'-'+dateTime['date']['month']+'-'+dateTime['date']['day']+' '+this.taskForm.get('time').value
      date=new Date(dateTime)
      formatDate=date.toISOString()
		}
		let data={
	  		name:this.taskForm.get('name').value,
	  		text:this.taskForm.get('text').value,
	  		dateTime:formatDate,
	  		team:this.taskForm.get('team').value,
	  		from:this.userData.id,
	  		for:this.taskForm.get('for').value,
	  		completad: this.taskForm.get('completad').value
	  	}
	  	this.team.editData('task/'+this.taskID,data).subscribe(
	  		result=>{
	  			this.toast.success("Task saved", "Well Done",{positionClass:"toast-top-right"} );
	  			this.taskForm.reset();
	  			this.showPopup=false;
	  			this.getTaskByTeam(data.team)
	  		},
	  		e=>{
	  			console.log(e)
		      	this.toast.error("Something wrong happened. Please try again", "Error",{positionClass:"toast-top-right"} );
	  		}
	  	)
	}
	editTask(i){
		this.taskID=this.tasks[i].id
		this.showPopup=true
		this.seeTask=false
    //get full date on string format
    let stringFullDate=this.tasks[i].dateTime;
    //get only date on string format
    let stringDate=stringFullDate.toString().split("T",1)
    //get full date to get time but first convert to date format
    let stringTime=new Date(stringFullDate)
    //convert date to string and take only the time
    let timeArray=stringTime.toString().split(" ")
    //get time 
    let dateArray=stringDate[0].split('-')
    let month=parseInt(dateArray[1]);
    let year=dateArray[0];
    let day=dateArray[2]
		this.getPlayerByTeam(this.tasks[i].team)
		this.taskForm=this.fb.group({
	  		name:[this.tasks[i].name, Validators.required],
	  		text:[this.tasks[i].text, Validators.required],
	  		team:[this.tasks[i].team],
	  		dateTime:[{date: {year: year, month: month, day:day}}],
	  		time:[timeArray[4]],
	  		for:[this.tasks[i].for],
	  		completad:[this.tasks[i].completad]
		})
	}
  showPopUp(i){
  	this.seeTask=true
  	this.currentTask=this.tasks[i];
    this.showPopup=true;
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

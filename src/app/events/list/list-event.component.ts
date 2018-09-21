import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TeamService } from '../../services/team.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Interceptor } from '../../interceptor/interceptor';
import { Router } from '@angular/router';
declare var jQuery:any;

@Component({
    selector: 'app-list-event',
    templateUrl: './list-event.component.html',
    styleUrls: ['./list-event.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class ListEventComponent implements OnInit {

    public teams = [];
    public events = [];
    public team: any;
    public showLoading = false;
    public by = "upcoming";
    public userData: any;
    public endpoint = Interceptor.url;
    showEvents:boolean=false;
    tracking:any
    count:any=[];
    plus:number=0;
    commentForm:FormGroup;
    eventId:number;
    index:number;
    constructor(private pageTitleService: PageTitleService, private fb: FormBuilder,
        private auth: AuthenticationService, public http: HttpClient,
        public toastr: ToastrService, public route: Router, private teamService:TeamService
    ) {
    }

    async ngOnInit() {
        this.commentForm=this.fb.group({
            comment:['',Validators.required]
        })
        this.pageTitleService.setTitle("Events");
        this.userData = this.auth.getLoginData();

        let teams = await this.http.get(`/roles?where={"name":"Manager","user":"${this.userData.id}"}`).toPromise() as any[];
        this.teams = teams.filter(it => {
            return it.team !== undefined;
        });
        if (this.teams[0]) {
            this.team = this.teams[0].team.id;
        }
        this.getEvents();
    }

    public async getEvents() {
        if (this.team === "") {
            this.teams = [];
            return;
        }
        let events = await this.http.get("/event/team/" + this.by + "/" + moment().format("MM-DD-YYYY-hh:mm") + "/" + this.team).toPromise() as any[];
        this.events = events;
        this.events.forEach((data,index)=>{
            if(data.type=='event' || data.type=='game'){
                this.plus++
                this.getTracking(data.id,index)
            }
        })
        if(events['length']>0){
           this.showEvents=true 
        }
        else{
            this.showEvents=false
        }
    }

    public errorHandler(event) {
        event.target.src = "assets/img/logo-lockerroom.png";
    }

    public detailEvent(event) {
        this.route.navigate(["/events/detail/" + event.id]);
    }

    showError(e) {
        this.showLoading = false;
        this.toastr.error(e, 'Error', { positionClass: "toast-top-right" });
    }

    showSuccess(msj) {
        this.showLoading = false;
        this.toastr.success('Well Done', msj, { positionClass: "toast-top-right" });
    }

    public trackByUsers(index: number, user: any): number { return index; }
    getDay(val){
      let date= new Date(val);
      return date.getDate();
    }
    getMonthName(val) {
          let date= new Date(val)
        let month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return month[date.getMonth()]; 
    }
    getHours(val){
       let date=new Date(val)
      let hours=date.getHours()
      let min = date.getMinutes();
      let minutes;
      if (min < 10) {
        minutes = "0" + min;
      }
      else{
        minutes=min
      }
      let ampm = "AM";
      if( hours > 12 ) {
          hours -= 12;
          ampm = "PM";
      }
      return hours +':'+ minutes+' ' + ampm
    }
    getTracking(id, index){
        this.teamService.getData('trackingevent/event/'+id).subscribe(
            result=>{
                let countYes=0,countNo=0,countMaybe=0;
                if(result['length']>0){
                    this.tracking=result
                    this.tracking.forEach((data)=>{
                        if(data.info=='yes'){
                            countYes+=1;
                        }else if(data.info=='no'){
                            countNo+=1
                        }
                        else{
                            countMaybe+=1
                        }
                        this.count[index]={
                            countYes:countYes,
                            countNo:countNo,
                            countMaybe:countMaybe
                        }
                    })
                }
                else{
                    this.count[index]={
                        countYes:0,
                        countNo:0,
                        countMaybe:0
                    }
                }
            },e=>{
                console.log(e)
            }
        )
    }
    //to add new or update player. who clicked on the are you coming section
    addTracking(val,event,index){
        let data={
            user:this.userData.id,
            event:event.id,
            info:val
        }
        //check if it a new player or not 
        this.teamService.getData(`trackingevent?where={"user":"${this.userData.id}","event":"${event.id}"}`).subscribe(
            result=>{
                if(result['length']>0){
                    //if it's new, update it
                    this.teamService.editData('trackingevent/'+result[0].id,data).subscribe(
                        result=>{
                            this.getTracking(event.id,index)
                        },
                        e=>{
                            console.log(e)
                        }
                    )
                }
                else{
                    //if it's not, add it
                    this.teamService.saveData('trackingevent/',data).subscribe(
                        result=>{
                            this.getTracking(event.id,index)
                        },
                        e=>{
                            console.log(e)
                        }
                    )
                }
            },
            e=>{console.log(e)}
        )
    }
    addComment(){
        let dateTime = moment().toISOString();
        let commentPost = {
          user: this.userData.id,
          username: this.userData.firstName,
          content: this.commentForm.get('comment').value,
          event: this.eventId,
          dateTime:dateTime,
          status: 'pending'
        }
        this.teamService.saveData('comments',commentPost).subscribe(
            result=>{
                this.events[this.index].comments.push(result)
                this.showSuccess('Your comment was added Successfully')
                this.commentForm.reset();
                jQuery('#comment').modal('toggle');
            },
            e=>{
                this.showError('something wrong happend. Please try again')
                console.log(e)
            }
        )
    }
    addEventId(id,i){
        this.eventId=id;
        this.index=i;
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TeamService } from '../../services/team.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Interceptor } from '../../interceptor/interceptor';
import { Router,ActivatedRoute } from '@angular/router';
declare var jQuery:any;

@Component({
    selector: 'app-detail-event',
    templateUrl: './detail-event.component.html',
    styleUrls: ['./detail-event.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})
export class DetailEventComponent implements OnInit {
    event:any;
    showLoading = false;
    id:any;
    userData: any;
    endpoint = Interceptor.url;
    showEvent:boolean=false;
    show_gallery:boolean=false;
    tracking:any
    countYes:number = 0;
    countNo:number = 0;
    countMaybe:number = 0;
    images:any;
    players:any;
    assistences:any;
    showPlayers:boolean=false;
    assistencesPlayers:any;
    date=new Date();
    currentDate:any;
    indexAssitence:number;
    newAssistence:boolean=false;
    showTodayButton:boolean=true;
    constructor(private pageTitleService: PageTitleService,
        private auth: AuthenticationService, public http: HttpClient,
        public toastr: ToastrService, public route: Router, private activeRoute:ActivatedRoute, private team:TeamService
    ) {
        this.id = this.activeRoute.snapshot.params["id"];
        this.getEvent();
        this.getTracking();
    }
    ngOnInit() {
        this.pageTitleService.setTitle("Event Details");
        this.userData = this.auth.getLoginData();
    }
    //this is for the section (are you coming?) to get the number of player
    getTracking(){
        this.team.getData('trackingevent/event/'+this.id).subscribe(
            result=>{
                this.countYes=0;
                this.countMaybe=0;
                this.countNo=0;
                if(result['length']>0){
                    this.tracking=result
                    this.tracking.forEach((data)=>{
                        if(data.info=='yes'){
                            this.countYes+=1;
                        }else if(data.info=='no'){
                            this.countNo+=1
                        }
                        else{
                            this.countMaybe+=1
                        }
                    })
                }
            },e=>{
                console.log(e)
            }
        )
    }
    //add image to gallery event
    addImage(files: FileList){
        if(files.length>0){
            this.showLoading=true;
            this.team.uploadFile('images/event/'+this.id+'/'+this.userData.id,'images',files).subscribe(
                result=>{
                    this.images=result
                    this.showLoading=false;
                },
                e=>{
                    console.log(e)
                    this.showLoading=false;
                }
            )
        }
        
    }
    //to change the event status (on time, cancelled, starting late, ending late)
    changeStatus(val){
        let data={
            id: this.event.id,
            status: val
        }
        this.team.editData('event/status', data).subscribe(
            result=>{
                this.getEvent();
            },
            e=>{
                console.log(e)
            }
        )
    }
    //to add new or update player. who clicked on the are you coming section
    addTracking(val){
        if(this.event.type=="game"){
            let data={
                user:this.userData.id,
                event:this.id,
                info:val
            }
            //check if it a new player or not 
            this.team.getData(`trackingevent?where={"user":"${this.userData.id}","event":"${this.id}"}`).subscribe(
                result=>{
                    if(result['length']>0){
                        //if it's new, update it
                        this.team.editData('trackingevent/'+this.tracking[0].id,data).subscribe(
                            result=>{
                                this.getTracking()
                            },
                            e=>{
                                console.log(e)
                            }
                        )
                    }
                    else{
                        //if it's not, add it
                        this.team.saveData('trackingevent/',data).subscribe(
                            result=>{
                                this.getTracking()
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
    }
    //get event details
    getEvent() {
        this.team.getData('event/' + this.id).subscribe(
            result=>{
                this.event = result
                this.showEvent=true
                this.images=result['images'];
                this.checkEvent();
            },
            e=>{
                console.log(e)
            }
        )
    }
    showGallery(){
        jQuery('#gallery').modal("show")
        this.showLoading=true;
    }
    //Attendance for this event option
    checkEvent(){
        //get the player of the current event
        this.getPlayers();
        //check if its has previous assistants list
        this.getAssistence();
        let days, daysRepeat=[], time=moment(this.event.time, "hh:mm a");
        //get the today day
        let today=this.date.getDay();
        let daysNumber=['su','m','tu','w','th','f','sa']; 
        if(this.event.repeats){
            //if the event is daily
            if(this.event.repeatsDaily){
                //show the current list 20 min before or hide if it's not
                let d=new Date(time.subtract(20, "minutes").toDate())
                if(this.date.getTime() >= d.getTime()){
                    this.currentDate=true
                }
                else{
                    this.currentDate=false
                }
            }
            //if the event is for example: monday, friday, etc
            else{
                //get days
                days=this.event.repeatsDays;
                days=days.split(',');
                //turns days to an array because the current value is repeatsDays: ",m,tu,f,w,th"
                days.forEach((data)=>{
                    if(data!=""){
                        daysRepeat.push(data)
                    }
                })
                //check if it's the current day.
                daysRepeat.forEach((day)=>{
                    if(day==daysNumber[this.date.getDay()]){
                        //show the current list 20 min before or hide if it's not
                        let d=new Date(time.subtract(20, "minutes").toDate())
                        if(this.date.getTime() >= d.getTime()){
                            this.currentDate=true
                        }
                        else{
                            this.currentDate=false
                        }
                    }
                })
            }

        }
        //if the event is only one time
        else{
            let d1=moment(this.date,"DD-MM-YYYY").format("YYYY-MM-DD")
            let d2=moment(this.event.dateTime,"YYYY-MM-DD").format("YYYY-MM-DD")
            //check if is the current day of the event
            if(d1==d2){
                //show the current list 20 min before or hide if it's not
                let d=new Date(time.subtract(20, "minutes").toDate())
                if(this.date.getTime() >= d.getTime()){
                    this.currentDate=true
                }
                else{
                    this.currentDate=false
                }
            }
        }
    }
    //get assistence list
    getAssistence(){
        this.team.getData('assistence/'+this.id).subscribe(
            result=>{
                this.assistences=result
                this.assistences.forEach((data)=>{
                    let d1=moment(this.date,"DD-MM-YYYY").format("YYYY-MM-DD")
                    let d2=moment(data.dateTime,"YYYY-MM-DD").format("YYYY-MM-DD")
                    //if current assitence is created hide today option and show the date
                    if(d1==d2){    
                        this.showTodayButton=false
                    }
                })
            },
            e=>{
                console.log(e)
            }
        )
    }
    //add or edit assitence
    addAsistence(val, status, late,index){
        //get the current player
        let player={
           id: val.id,
           status: status,
           late: late,
           user: val.user.id
        }
        let players=[],i;
        let data;
        let dateTime=new Date();
        //if the assistence is created. edit it
        if(index>=0){
            //get the current player index
            players=this.assistences[index].players;
            players.forEach((data, index)=>{
                if(data.id===player.id){
                    i=index
                }

            })
            //if the current player is in the list. update it
            if(i>=0){
                players[i]=player
            }
            //if it's not. add it
            else{
                players.push(player)
            }
            data={
                players:players
            }
            //update the assistence event
            this.team.editData('assistenceevents/'+this.assistences[index].id,data).subscribe(
                result=>{
                    this.assistences.players=result['players']
                },
                e=>{
                    console.log(e)
                }
            )
        }
        //if it's not. create it
        else{
            players[0]=player
            data={
                dateTime:dateTime,
                event:this.id,
                players:players
            }
            this.team.saveData('assistenceevents/',data).subscribe(
                result=>{
                    this.newAssistence=true
                    this.showPlayers=false
                    this.getAssistence();
                },
                e=>{
                    console.log(e)
                }
            )
        }
    }
    getStatus(id,index){
        let val
        if(index>=0){
            if(this.assistences.length>0){
                this.assistences[index].players.forEach((data)=>{
                    if(id==data.id){
                        val=data.status
                    }
                })
            }
        }
        else{
            val='none'
        }
        return val
    }
    getLate(id,index){
        let val
        if(index>=0){
            if(this.assistences.length>0){
                this.assistences[index].players.forEach((data)=>{
                    if(id==data.id){
                        val=data.late
                    }
                })
            }
        }
        else{
            val=false
        }
        return val
    }
    public errorHandler(event) {
        event.target.src = "assets/img/logo-lockerroom.png";
    }

    public editEvent(event) {
        this.route.navigate(["/events/edit/" + event.id]);
    }

    showError(e) {
        this.showLoading = false;
        this.toastr.error(e, 'Error', { positionClass: "toast-top-right" });
    }

    showSuccess() {
        this.showLoading = false;
        this.toastr.success('Well Done', 'Your event was added Successfully', { positionClass: "toast-top-right" });
    }

    public trackByUsers(index: number, user: any): number { return index; }
    getDay(val){
      let date= new Date(val);
      return date.getDate();
    }
    getPlayers(){
        this.team.getData('players?where={"team":"' + this.event.team.id + '"}').subscribe(
            result=>{
                this.players=result
            },
            e=>{
                console.log(e)
            }
        )
    }
    getPlayersName(id){
        let name
        this.players.forEach((data)=>{
            if(data.id===id){
                name=data.user.firstName+' '+data.user.lastName
            }
        })
        return name
    }
    getDate(val) {
        let date= new Date(val)
        let month = new Array();
        month[0] = "January";
        month[1] = "Febrary";
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
        let hours=date.getHours()
        let min = date.getMinutes();
        let minutes;
        let th;
        let day=date.getDate();
        if(day==1 || day==21 || day ==31){
            th='st'
        }
        else if(day==2 || day==22){
            th='nd'
        }
        else if(day==3 || day==23){
            th='rd'
        }
        else{
            th='th'
        }
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
        return `${day}${th} ${month[date.getMonth()]} ${hours}:${minutes} ${ampm}`
    }
    ShowPlayers(index){
        this.indexAssitence=index
        this.showPlayers=true;
    }
    goToEdit(){
        this.route.navigate([`/events/edit/${this.id}`])
    }
    removeEvent(id, images){
        if(images && images.length>0){
            this.team.deleteData('images/events/'+id).subscribe(
                result=>{
                    this.team.deleteData('event/'+id).subscribe(
                        result=>{
                          this.toastr.success('Well Done', 'Your event was deleted Successfully', { positionClass: "toast-top-right" });
                            this.route.navigate(['/events/list'])
                        }
                    )
                }
            )
        }else{
            this.team.deleteData('event/'+id).subscribe(
                result=>{
                  this.toastr.success('Well Done', 'Your event was deleted Successfully', { positionClass: "toast-top-right" });
                    this.route.navigate(['/events/list'])
                }
            )
        }
    }
    closePopup(){
        this.showPlayers=false
    }
}

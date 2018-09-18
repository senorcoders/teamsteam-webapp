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
    addTracking(val){
        if(this.event.type=="game"){
            let data={
                user:this.userData.id,
                event:this.id,
                info:val
            }
            this.team.getData(`trackingevent?where={"user":"${this.userData.id}","event":"${this.id}"}`).subscribe(
                result=>{
                    if(result['length']>0){
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
    getEvent() {
        this.team.getData('event/' + this.id).subscribe(
            result=>{
                this.event = result
                this.showEvent=true
                this.images=result['images']
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
}

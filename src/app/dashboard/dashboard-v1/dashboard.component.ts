import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { orders, products, customers, refunds, cost, pie } from '../dashboard.data';
import * as Ps from 'perfect-scrollbar';
import {UserService} from '../../services/user.service';
import { TranslateService } from 'ng2-translate';
import { HttpClient } from '@angular/common/http';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';
import * as moment from 'moment';
import { environment } from 'environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

@Component({
  selector: 'ms-dashboard',
  templateUrl:'./dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class DashboardComponent implements OnInit {
  @ViewChild('myTable') table: any;
  @ViewChild(DatatableComponent) table2: DatatableComponent;

  expanded: any = {};
  timeout: any;

  stats: any;
  rows = [];
  temp = [];
  showAnalytics:boolean = false;
  columns = [
    { prop: 'name' },
    { name: 'Screen' },
    { name: 'Time Visited' },
    { name: 'Start Date' },
    { name: 'Start Time' },
    { name: 'End Date' },
    { name: 'End Time' }
  ];

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
};

// Initialized to specific date (09.10.2018)
private model: any = {beginDate: '',
endDate: ''};
 

  constructor(private userservice: UserService, private pageTitleService: PageTitleService, public translate: TranslateService, 
    public http: HttpClient, public auth:AuthenticationService) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en'); 
   this.stats = {
              "user": 0,
              "veridiedUsers": 0,
              "teams": 0
            }
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Home");
    this.getStats();
    this.getAnalytical();
    let user = this.auth.getLoginData();
    environment.superadmin.forEach((data)=>{
      if(user.email === data){
            this.showAnalytics = true;
      }
    })
    this.setDateRange();
  }


  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();

    this.model.beginDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
  };

  this.model.endDate =   {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
}
}

  getStats(){
    this.userservice.getDashboard().subscribe(
      data=>{
        this.stats=data;
      },
      error=>{
        console.log(error)
      }
    )
  }

  getAnalytical(){
    this.http.get('/screen?limit=100000').subscribe(result => {
        let listScreen:any = result;
        let tRows = listScreen.length - 1;
        listScreen.forEach((element, index) => {
          let tRow = {
            'name': element.firstName + ' ' + element.lastName,
            'screen': element.screen,
            'timeVisited': element.timeVisited,
            // 'team': element.team.name,
            'startDate': moment(element.startTime).format('l'),
            'startTime': moment(element.startTime).format('LTS'),
            'endDate': moment(element.endTime).format('l'),
            'endTime': moment(element.endTime).format('LTS')

          }

          this.rows.push(tRow);

          console.log(index);

          if(index == tRows){
            this.temp = [...this.rows];
            console.log(this.temp);

          }


        });
    })
  }

  ngOnDestroy(){
    
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    console.log(this.table.rowDetail);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  getRowHeight(row) {
    return row.height;
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.screen.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    // event properties are: event.beginDate, event.endDate, event.formatted,
    // event.beginEpoc and event.endEpoc
    
    console.log(event.beginDate, event.endDate, event.formatted);
    var sDate = event.beginDate.month + '/' + event.beginDate.day + '/' + event.beginDate.year;
    var eDate = event.endDate.month + '/' + event.endDate.day + '/' + event.endDate.year;
    console.log(sDate, eDate);
    if(sDate != "0/0/0"){
      const temp = this.temp.filter(function(d) {
        return (d.startDate.toLowerCase().indexOf(sDate) !== -1 || !sDate) || (d.endDate.toLowerCase().indexOf(eDate) !== -1 || !eDate);
      });
  
      console.log(temp);
      this.rows = temp;
      this.table.offset = 0;
    }else{
      this.rows = [];
      this.ngOnInit();
    }


}



}















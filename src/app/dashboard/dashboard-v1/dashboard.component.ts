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
    if(user.email === environment.superadmin){
      this.showAnalytics = true;
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
    this.http.get('/screen').subscribe(result => {
        let listScreen:any = result;
        let tRows = listScreen.length - 1;
        listScreen.forEach((element, index) => {
          let tRow = {
            'name': element.firstName + ' ' + element.lastName,
            'screen': element.screen,
            'timeVisited': element.timeVisited,
            // 'team': element.team.name,
            'startTime': moment(element.startTime).format('MMMM Do YYYY, h:mm:ss a'),
            'endTime': moment(element.endTime).format('MMMM Do YYYY, h:mm:ss a')
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

}















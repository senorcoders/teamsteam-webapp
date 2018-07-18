import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { orders, products, customers, refunds, cost, pie } from '../dashboard.data';
import * as Ps from 'perfect-scrollbar';
import {UserService} from '../../services/user.service';

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
  stats: any;

  constructor(private userservice: UserService, private pageTitleService: PageTitleService) {
   this.stats = {
              "user": 0,
              "veridiedUsers": 0,
              "teams": 0
            }
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Home");
    this.getStats();
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

  ngOnDestroy(){
    
  }

}















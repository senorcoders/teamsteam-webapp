import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { orders, products, customers, refunds, cost, pie } from '../dashboard.data';
import * as Ps from 'perfect-scrollbar';

function getNewTime(d){
  let h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
      s = (d.getSeconds()<10?'0':'') + d.getSeconds(),
      time = h + ":" + m + ":" + s;
  return time;
}

@Component({
  selector: 'ms-dashboard1',
  templateUrl:'./dashboard1-component.html',
  styleUrls: ['./dashboard1-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
      "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class DashboardOneComponent implements OnInit  {

  public orders: any[];
  public products: any[];
  public customers: any[];
  public refunds: any[];
  public cost: any[];
  public pie: any[];
  
  public newTodoText:string = '';

  public todoList = [
    { text: 'Make the bed' },
    { text: 'Pay Bills'},
    { text: 'Prepare documents'},
    { text: 'Send update mails'},
    { text: 'Attend seminar at 3:00 PM' },
    { text: 'Book air tickets' },
    { text: 'Reply support requests'},
    { text: 'Yoga classes' }
  ];
	

  constructor(private pageTitleService: PageTitleService) {
    setInterval(() => { 
      this.cost = [...this.addRandomValue2()];
    }, 3000);
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Dashboard 2");
    this.orders = orders;
    this.products = products;
    this.customers = customers;
    this.refunds = refunds;
    this.orders = this.addRandomValue('orders');     
    this.customers = this.addRandomValue('customers');
    this.cost = cost;
    this.pie = pie;
    /** Perfect scrollbar for chat window **/
    const elemTodo = <HTMLElement>document.querySelector('.to-do-list-wrap');
    if (window.matchMedia(`(min-width: 960px)`).matches) {
      Ps.initialize(elemTodo, { wheelSpeed: 2, suppressScrollX: true });    
    }
    setTimeout(() => this.orders = [...orders] ); 
    setTimeout(() => this.products = [...products] ); 
    setTimeout(() => this.customers = [...customers] ); 
    setTimeout(() => this.refunds = [...refunds] );
    setTimeout(() => this.pie = [...pie] ); 
    setTimeout(() => this.cost = [...cost] ); 
  }
  
      public addRandomValue(param) {
    switch(param) {
      case 'orders':
        for (let i = 1; i < 30; i++) { 
          this.orders[0].series.push({"name": 1980+i, "value": Math.ceil(Math.random() * 1000000)});
        } 
        return this.orders;
      case 'customers':
        for (let i = 1; i < 15; i++) { 
          this.customers[0].series.push({"name": 2000+i, "value": Math.ceil(Math.random() * 1000000)});
        } 
        return this.customers;
      default:
        return this.orders;
    }
  }
  
  public addRandomValue2() {
    let value1 = Math.random() * 1000000;    
    this.cost[0].series.push({"name": getNewTime(new Date()), "value": value1});
    let value2 = Math.random() * 1000000;
    this.cost[1].series.push({"name": getNewTime(new Date()), "value": value2});
    if (this.cost[0].series.length > 5) this.cost[0].series.splice(0,1);
    if (this.cost[1].series.length > 5) this.cost[1].series.splice(0,1);
    return this.cost;
  } 
   
  public colorScheme = {
    domain: ['#0066EB','#F8C51C' , '#51CAE3', '#ff5723', '#F54B5E', '#00caac']
  };

  public barColorScheme = {
    domain: ['#0066EB']
  };

  public barColorScheme2 = {
    domain: ['#FF5723']
  };
   
  public autoScale = true;
   
  public showXAxis = true;
  public showYAxis = true;
  public gradient:boolean = false;
  public tooltipDisabled:boolean = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Time';
  public showYAxisLabel = true;
  public yAxisLabel = 'Cost';
  public colorScheme2 = {
    domain: ['#0066EB', '#00caac', '#51CAE3', '#ff5723', '#F54B5E', '#F8C51C']
  };
  
  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
   
   public onSelect(event) {
     console.log(event);
   }
   
   
  public  getNotDeleted() {
    return this.todoList.filter((item:any) => {
      return !item.deleted
    })
  }


  public addToDoItem($event) {
    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      this.todoList.unshift({
          text: this.newTodoText
      });
      this.newTodoText = '';
    }
  }

  users : object[] = [{
    image : 'assets/img/user-1.jpg',
    name : 'Shally'
  },{
    image : 'assets/img/user-2.jpg',
    name : 'Lamar'
  },{
    image : 'assets/img/user-3.jpg',
    name : 'Lucinda'
  },{
    image : 'assets/img/user-4.jpg',
    name : 'Chester'
  },{
    image : 'assets/img/user-5.jpg',
    name : 'Clayton'
  },{
    image : 'assets/img/user-6.jpg',
    name : 'Andrew'
  },{
    image : 'assets/img/user-7.jpg',
    name : 'Terry'
  },{
    image : 'assets/img/dummy-user.png',
    name : 'Martha'
  }];
   
  ngOnDestroy(){
    this.cost[0].series.length = 0;
  }

}

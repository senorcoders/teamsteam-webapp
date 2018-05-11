import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
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

  public orders: any[];
  public products: any[];
  public customers: any[];
  public refunds: any[];
  public cost: any[];
  public pie: any[];
  
  public customStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

  lat: number = 50.937531;
  lng: number = 6.960278600000038;

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

  constructor( private pageTitleService: PageTitleService) {
    setInterval(() => { 
      this.cost = [...this.addRandomValue2()];
    }, 3000);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Home");

    this.orders = orders;
    this.products = products;
    this.customers = customers;
    this.refunds = refunds;
    this.orders = this.addRandomValue('orders');     
    this.customers = this.addRandomValue('customers');
    this.cost = cost;
    this.pie = pie;

    setTimeout(() => this.orders = [...orders] ); 
    setTimeout(() => this.products = [...products] ); 
    setTimeout(() => this.customers = [...customers] ); 
    setTimeout(() => this.refunds = [...refunds] );
    setTimeout(() => this.pie = [...pie] ); 
    setTimeout(() => this.cost = [...cost] ); 

    /** Perfect scrollbar for chat window **/
    const elemTodo = <HTMLElement>document.querySelector('.to-do-list-wrap ');
    if (window.matchMedia(`(min-width: 960px)`).matches) {
      Ps.initialize(elemTodo, { wheelSpeed: 2, suppressScrollX: true });    
    }

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
    let value1 = Math.random() * 1000;    
    this.cost[0].series.push({"name": getNewTime(new Date()), "value": value1});
    let value2 = Math.random() * 1000;
    this.cost[1].series.push({"name": getNewTime(new Date()), "value": value2});
    if (this.cost[0].series.length > 5) this.cost[0].series.splice(0,1);
    if (this.cost[1].series.length > 5) this.cost[1].series.splice(0,1);
    return this.cost;
  } 
   
   public colorScheme = {
        domain: ['#FFFFFF']
   }; 
   public autoScale = true;
   
  public showXAxis = true;
  public showYAxis = true;
  public gradient:boolean = true;
  public tooltipDisabled:boolean = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Time';
  public showYAxisLabel = true;
  public yAxisLabel = 'Cost';
  public colorScheme2 = {
    domain: ['#0066EB', '#00caac', '#51CAE3', '#ff5723', '#F54B5E', '#F8C51C']
  };
  
  public dynamicChartColor = {
    domain: ['#ff5723', '#0066EB']
  }
  
  public picChartColor = {
    domain: ['#43ae3f', '#0066EB', '#ff5723']
  }
  
  // pie
  showLabels = false;
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

  newmembers : object[] = [{
    image : 'assets/img/user-1.jpg',
    name  : 'jim Conner'
  },{
    image : 'assets/img/user-2.jpg',
    name  : 'Frederick'
  },{
    image : 'assets/img/user-3.jpg',
    name  : 'Lucinda'
  },{
    image : 'assets/img/user-4.jpg',
    name  : 'Chester'
  },{
    image : 'assets/img/user-5.jpg',
    name  : 'Clayton'
  },{
    image : 'assets/img/user-6.jpg',
    name  : 'Andrew'
  },{
    image : 'assets/img/user-7.jpg',
    name  : 'Terry'
  },{
    image : 'assets/img/user-8.jpg',
    name  : 'Martha'
  }];
   
  ngOnDestroy(){
    this.cost[0].series.length = 0;
  }

}















import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
   selector: 'ms-easy-pie',
   templateUrl:'./easy-pie-chart-component.html',
   styleUrls: ['./easy-pie-chart-component.scss'],
   encapsulation: ViewEncapsulation.None,
   host: {
    "[@fadeInAnimation]": 'true'
   },
   animations: [ fadeInAnimation ]
})
export class EasyPieChartComponent implements OnInit  {
	
 	public percent: number;
 	public percent2: number;
    public percent3: number;
    public percent4: number;
  	public options: any;
  	public options2: any;
	public options3: any;
	public options4: any;

 
  	constructor(private pageTitleService: PageTitleService) {
    
    	this.percent = 80;
    	this.options = {
      		barColor: '#0066eb',
      		trackColor: '#dee4e8',
      		scaleColor: false,
      		scaleLength: 5,
      		lineCap: 'round',
      		lineWidth: 3,
      		size: 300,
      		rotate: 0,
      		animate: {
          		duration: 3000,
          		enabled: true
      		}
    	};

    	this.percent2 = 70;
    	this.options2 = {
      		barColor: '#00caac',
      		trackColor: '#dee4e8',
      		scaleColor: '#dee4e8',
      		scaleLength: 5,
      		lineCap: 'round',
      		lineWidth: 3,
      		size: 300,
      		rotate: 0,
      		animate: {
          		duration: 3000,
          		enabled: true
      		}
    	};
        
      this.percent3 = 100;
    	this.options3 = {
      		barColor: '#ff5723',
      		trackColor: '#dee4e8',
      		scaleColor: '#dee4e8',
      		scaleLength: 5,
      		lineCap: 'round',
      		lineWidth: 10,
      		size: 300,
      		rotate: 0,
      		animate: {
          		duration: 3000,
          		enabled: true
      		}
    	};
        
      this.percent4 = 90;
    	this.options4 = {
      		barColor: '#414658',
      		trackColor: '#dee4e8',
      		scaleColor: '#dee4e8',
      		scaleLength: 5,
      		lineCap: 'round',
      		lineWidth: 20,
      		size: 300,
      		rotate: 0,
      		animate: {
          		duration: 3000,
          		enabled: true
      		}
    	};
  	}
    ngOnInit() {
      this.pageTitleService.setTitle("Easy Pie");
    }
	
}




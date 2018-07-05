import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-carousel',
  	templateUrl:'./carousel-component.html',
  	styleUrls: ['./carousel-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class CarouselComponent implements OnInit{
	
	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Carousel");
   	}
}

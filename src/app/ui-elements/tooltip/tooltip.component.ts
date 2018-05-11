import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
declare var $ : any;

@Component({
    selector: 'ms-tooltip',
  	templateUrl:'./tooltip-component.html',
  	styleUrls: ['./tooltip-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class TooltipComponent implements OnInit{
	
	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Tooltip");
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
   	}
}

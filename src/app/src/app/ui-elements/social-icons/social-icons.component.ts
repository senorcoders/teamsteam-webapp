import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-social-icons',
  	templateUrl:'./social-icons-component.html',
  	styleUrls: ['./social-icons-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class SocialIconsComponent implements OnInit{
	
	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Social Icons");
   	}
}

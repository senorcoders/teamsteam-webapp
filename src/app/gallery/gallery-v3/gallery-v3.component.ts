import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  'selector': 'ms-gallery-v3',
  templateUrl:'./gallery-v3-component.html',
  styleUrls: ['./gallery-v3-component.scss'],
   encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class GalleryThreeComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Gallery V3");
  }

 		images : object[] = [{
		image : 'assets/img/gallery1.jpg',
		title : 'Buildings',
		post : '04/03/2017'
	},{
		image : 'assets/img/gallery2.jpg',
		title : 'Social',
		post : '04/05/2017'
	},{
		image : 'assets/img/gallery3.jpg',
		title : 'Note Good',
		post : '04/07/2017'
	},
	{
		image : 'assets/img/gallery4.jpg',
		title : 'Direction',
		post : '04/13/2017'
	},
	{
		image : 'assets/img/gallery5.jpg',
		title : 'Focus',
		post : '04/25/2017'
	},
	{
		image : 'assets/img/gallery6.jpg',
		title : 'Virtual',
		post : '04/26/2017'
	}]
}
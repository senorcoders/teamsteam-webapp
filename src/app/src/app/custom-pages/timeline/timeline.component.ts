import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class TimelineComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
  	this.pageTitleService.setTitle("Timeline");
  }

  posts : object[] = [{
    image : 'assets/img/project-1.jpg',
    title : 'Title of section 1'
  },{
    image : 'assets/img/project-2.jpg',
    title : 'Title of section 2'
  },{
    image : 'assets/img/project-3.jpg',
    title : 'Title of section 3'
  }]
}

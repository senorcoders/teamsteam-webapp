import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  'selector': 'ms-blog-grid',
  templateUrl:'./blog-grid-component.html',
  styleUrls: ['./blog-grid-component.scss'],
   encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class BlogGridComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Blog Grid");
  }

  blogs : object[] = [{
    image : 'assets/img/project-1.jpg'
  },{
    image : 'assets/img/project-2.jpg'
  },{
    image : 'assets/img/project-3.jpg'
  },{
    image : 'assets/img/project-4.jpg'
  },{
    image : 'assets/img/project-5.jpg'
  },{
    image : 'assets/img/project-6.jpg'
  },{
    image : 'assets/img/project-7.jpg'
  },{
    image : 'assets/img/project-8.jpg'
  }];

}
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  'selector': 'ms-blog-listing',
  templateUrl:'./blog-listing-component.html',
  styleUrls: ['./blog-listing-component.scss'],
   encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class BlogListingComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Blog Listing");
  }

  posts : object[] = [{
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
  }];

}
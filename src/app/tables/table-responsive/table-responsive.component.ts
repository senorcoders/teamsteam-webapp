"use strict";

import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-responsive-table',
    templateUrl:'./table-responsive-component.html',
    styleUrls: ['./table-responsive-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]

})
export class ResponsiveTableComponent implements OnInit {


  constructor(private pageTitleService: PageTitleService) {

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Responsive");
  }


}




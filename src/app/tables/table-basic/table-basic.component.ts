import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-basic-table',
    templateUrl:'./table-basic-component.html',
    styleUrls: ['./table-basic-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]

})
export class BasicTableComponent implements OnInit {


  constructor(private pageTitleService: PageTitleService) {

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Basic");
  }


}




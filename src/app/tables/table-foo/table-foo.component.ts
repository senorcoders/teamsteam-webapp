import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

declare var $ : any;

@Component({
    selector: 'ms-foo-table',
    templateUrl:'./table-foo-component.html',
    styleUrls: ['./table-foo-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]

})
export class FooTableComponent implements OnInit {


  constructor(private pageTitleService: PageTitleService) {

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Foo Table");
    $('.table').footable();
  }


}




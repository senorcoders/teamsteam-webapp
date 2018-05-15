import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  'selector': 'ms-ecommerce-order-detail',
  templateUrl:'./ecommerce-order-detail-component.html',
  styleUrls: ['./ecommerce-order-detail-component.scss'],
   encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class EcommerceOrderDetailComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Ecommerce Order Detail");
  }

}
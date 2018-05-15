import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  'selector': 'ms-ecommerce-product-detail',
  templateUrl:'./ecommerce-product-detail-component.html',
  styleUrls: ['./ecommerce-product-detail-component.scss'],
   encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class EcommerceProductDetailComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Ecommerce Product Detail");
  }

}
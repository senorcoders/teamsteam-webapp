import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  'selector': 'ms-ecommerce-product',
  templateUrl:'./ecommerce-product-component.html',
  styleUrls: ['./ecommerce-product-component.scss'],
   encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class EcommerceProductComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Ecommerce Product");
  }

  products : object[] = [{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-1.jpg'
  },{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-2.jpg'
  },{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-3.jpg'
  },{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-4.jpg'
  },{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-5.jpg'
  },{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-6.jpg'
  },{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-7.jpg'
  },{
    id: '#100001',
    title : 'Dumbells',
    price : '$224.00',
    image : 'assets/img/D-product-8.jpg'
  }]
}
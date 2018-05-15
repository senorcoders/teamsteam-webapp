import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
declare var jQuery: any;

@Component({
    selector: 'ms-vector-map',
  	templateUrl:'./vectormap-component.html',
  	styleUrls: ['./vectormap-component.scss'],
      encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class VectorMapComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
        this.pageTitleService.setTitle("Vector Map");
        jQuery('#vmap').vectorMap({ map: 'world_en' });
   	}

}

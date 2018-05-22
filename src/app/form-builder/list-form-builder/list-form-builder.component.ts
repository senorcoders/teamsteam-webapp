import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  selector: 'app-list-form-builder',
  templateUrl: './list-form-builder.component.html',
  styleUrls: ['./list-form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
        "[@fadeInAnimation]": 'true'
    },
  animations: [ fadeInAnimation ]
})
export class ListFormBuilderComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("List Form Builder");
  }

}

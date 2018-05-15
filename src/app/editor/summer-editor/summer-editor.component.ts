import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
declare var jQuery: any;
@Component({
  selector: 'ms-summer-editor',
  templateUrl: './summer-editor.html',
  styleUrls: ['./summer-editor.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})

export class SummerEditorComponent implements AfterViewInit {

  constructor(private pageTitleService: PageTitleService) {}

    ngAfterViewInit() {   
      this.pageTitleService.setTitle("Summer Editor");     
        jQuery("#summernote").summernote(
          {
            height: 400, 
            minHeight: null,
            maxHeight: null, 
            focus: true 
          }
        );
    }
}

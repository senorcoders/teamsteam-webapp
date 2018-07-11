import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";

@Component({
   selector: 'ms-teams',
   templateUrl:'./teams-component.html',
   styleUrls: ['./teams-component.scss'],
   encapsulation: ViewEncapsulation.None,
   host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class TeamsComponent implements OnInit {

  chatopened: boolean = false;
  chatmode = "push";

  _toggleChatSidebar() {
    this.chatopened = !this.chatopened;
  }

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Teams");
  }
	
}




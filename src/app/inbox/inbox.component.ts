import {
  Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef,
  Renderer, AfterViewChecked
} from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";

@Component({
  selector: 'ms-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class InboxComponent implements OnInit, OnDestroy, AfterViewChecked {

  public ckeditorContent:string = '<p>Hello CKEditor</p>';
  public config = {
    uiColor: '#dee4e8',
    height: '500',
  };

  constructor(
    private pageTitleService: PageTitleService
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle("Inbox");
  }

  ngAfterViewChecked() {}

  ngOnDestroy() {}
}

import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-userlist',
    templateUrl:'./userlist-component.html',
    styleUrls: ['./userlist-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class UserListComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {}

  ngOnInit() {
    this.pageTitleService.setTitle("User List");
  }
	
  users: Object[] = [{
      name: 'Belle Romero',
      post:'Marketing',
      image:'assets/img/user-1.jpg'
    },{
      name: 'Jorge Zimmerman',
      post:'Android Dev.',
      image:'assets/img/user-2.jpg'
    },{
      name: 'Michael McGee',
      post:'Jr. Android Dev.',
      image:'assets/img/user-3.jpg'
    },{
      name: 'Mary Wise',
      post:'Designer',
      image:'assets/img/user-4.jpg'
    },{
      name: 'Dennis Cook',
      post:'UX Expert',
      image:'assets/img/user-5.jpg'
    },{
      name: 'Andrew Johnston',
      post:'Android Dev.',
      image:'assets/img/user-6.jpg'
    },{
      name: 'Garrett Osborne',
      post:'UX Expert',
      image:'assets/img/user-7.jpg'
    },{
      name: 'Travis Perry',
      post:'Sales Consultant',
      image:'assets/img/user-8.jpg'
    }
  ];
	
}




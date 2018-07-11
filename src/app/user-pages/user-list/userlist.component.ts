import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';

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
  users:any;
  endpoint:string;
  constructor(private userservice: UserService, private auth:AuthenticationService, private pageTitleService: PageTitleService) {
    this.users = [{
        id: 0,
        firstName: '',
        lastName:'',
        verified: false
      }
    ];
  }

  ngOnInit() {
    this.endpoint = this.auth.getBaseUrl(); 
    this.pageTitleService.setTitle("User List");
    this.getUsers();
  }
	getUsers(){    
    this.userservice.getUsers().subscribe(
      data=>{
      
        this.users=data;
      },
      error=>{
        console.log(error)
      }
    )
  }
  errorHandler(event) {
   event.target.src = "assets/img/logo-lockerroom.png";
 }
	
}




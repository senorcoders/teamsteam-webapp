import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
//my imports
import {AuthenticationService} from '../../services/authentication.service';
import { PerfilImageService } from '../../core/perfil-image/perfil-image.service';
@Component({
    selector: 'ms-user-profile',
    templateUrl:'./user-profile-component.html',
    styleUrls: ['./user-profile-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class UserProfileComponent implements OnInit {
  //my variables
  perfilImage:string;
  userData:any;
  constructor(private perfilImageService:PerfilImageService, private pageTitleService: PageTitleService, private auth:AuthenticationService) {}

  ngOnInit() {
    this.pageTitleService.setTitle("User Profile");
    this.getUserInfo();
  }
	getUserInfo(){
        this.userData= this.auth.getLoginData();
     /*get the perfil image from from service*/
     this.perfilImageService.perfilImage.subscribe(
        result=>{
          this.perfilImage=result
        },
        error=>{console.log(error)}
      )
    }
  users: Object[] = [{
      name: 'Adam',
      city: 'California',
      country: 'USA',
      post:'Senior Developer, Company Inc.',
      image:'assets/img/user-1.jpg'
    },{
      name: 'Thomas',
      city: 'Punjab',
      country: 'India',
      post:'Software Engineer, Company Inc.',
      image:'assets/img/user-2.jpg'
    },{
      name: 'Gilcharist',
      city: 'California',
      country: 'USA',
      post:'Senior Developer, Company Inc.',
      image:'assets/img/user-3.jpg'
    },{
      name: 'John',
      city: 'Punjab',
      country: 'India',
      post:'Software Engineer, Company Inc.',
      image:'assets/img/user-4.jpg'
    },{
      name: 'Smith',
      city: 'California',
      country: 'USA',
      post:'Senior Developer, Company Inc.',
      image:'assets/img/user-1.jpg'
    },{
      name: 'Peter',
      city: 'Punjab',
      country: 'India',
      post:'Software Engineer, Company Inc.',
      image:'assets/img/user-2.jpg'
    },{
      name: 'Kley',
      city: 'California',
      country: 'USA',
      post:'Senior Developer, Company Inc.',
      image:'assets/img/user-3.jpg'
    },{
      name: 'Adam',
      city: 'Punjab',
      country: 'India',
      post:'Software Engineer, Company Inc.',
      image:'assets/img/user-4.jpg'
    },{
      name: 'Orton',
      city: 'California',
      country: 'USA',
      post:'Senior Developer, Company Inc.',
      image:'assets/img/user-1.jpg'
    }
  ];
	
}



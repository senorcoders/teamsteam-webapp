import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
//my imports
import { AuthenticationService } from '../../services/authentication.service';
import { PerfilImageService } from '../../core/perfil-image/perfil-image.service';
@Component({
  selector: 'ms-user-profile',
  templateUrl: './user-profile-component.html',
  styleUrls: ['./user-profile-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class UserProfileComponent implements OnInit {
  //my variables
  perfilImage: string;
  userData: any;

  constructor(
    private perfilImageService: PerfilImageService, private pageTitleService: PageTitleService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle("User Profile");
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData = this.auth.getLoginData();
    /*get the perfil image from from service*/
    this.perfilImageService.perfilImage.subscribe(
      result => {
        this.perfilImage = result
      },
      error => { console.log(error) }
    )
  }

}




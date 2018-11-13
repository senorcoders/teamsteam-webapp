import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
//my imports
import { AuthenticationService } from '../../services/authentication.service';
import { PerfilImageService } from '../../core/perfil-image/perfil-image.service';
import { Interceptor } from 'app/interceptor/interceptor';
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
  ) { 
    this.userData = this.auth.getLoginData();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("User Profile");
    this.getUserInfo();
  }

  getUserInfo() {
    this.perfilImage = this.auth.getPerfilImage();
  }

  public loadImage(e){
    e.target.src = this.auth.urlImageUserDefault;
  }

}




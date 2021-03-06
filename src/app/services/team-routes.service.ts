import { Injectable } from '@angular/core';
import {CanActivate,Router,ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import{AuthenticationService} from "./authentication.service";

@Injectable()
export class TeamRoutesService {

  constructor(private autorizacionService:AuthenticationService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  	let result=this.autorizacionService.getLoginData()
  	if (result) {
	    if(result.roles[0].name=="Manager"){
	        return true;
	    }else {
	      this.router.navigate(['/dashboard/dashboard-v1']);
	    return false;
	  }
	}
	else{
		this.router.navigate(['/dashboard/dashboard-v1']);
	    return false;
	}
}

}

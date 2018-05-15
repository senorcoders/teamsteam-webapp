import { Injectable } from '@angular/core';
import {CanActivate,Router,ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import{AuthenticationService} from "./authentication.service";

@Injectable()
export class MyGuardService {

  constructor(private autorizacionService:AuthenticationService,private router: Router){
}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  	let result=this.autorizacionService.getLoginData()
  	if (result) {
	    if(result.role.name=="Player" || result.role.name=="Manager"){
	        return true;
	    }else {
	      this.router.navigate(['/loginone']);
	    return false;
	  }
	}
	else{
		this.router.navigate(['/loginone']);
	    return false;
	}
}

}

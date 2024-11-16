import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class MyGuardService {

  constructor(private autorizacionService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result = this.autorizacionService.getLoginData()
    if (result) {
      let valid = false;
      for (const rol of result.roles) {
        if (rol.name === 'Manager') {
          valid = true;
          break;
        }
      }

      return valid;
    } else {
      this.router.navigate(['/loginone']).then();
      return false;
    }
  }
}

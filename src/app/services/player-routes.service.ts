import {Injectable} from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class PlayerRoutesService {
  constructor(
    private autorizacionService: AuthenticationService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result = this.autorizacionService.getLoginData();
    let valid = false;
    if (result) {
      for (const role of result.roles) {
        if (role.name === 'Manager') {
          valid = true;
          break;
        }
      }
    }

    if (!valid) {
      this.router.navigate(['/dashboard/dashboard-v1']).then();
    }

    return valid;
  }
}

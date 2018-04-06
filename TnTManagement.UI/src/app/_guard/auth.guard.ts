import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        if (this._authenticationService.isAuthenticated()) {
            if (localStorage.getItem('currentUser')) {
                 //logged in so return true
                 //console.log(localStorage.getItem('currentUser'));
               // alert(localStorage.getItem('currentUser'));
                return true;
            }
            else
            {
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
           
        }
        else {
           // console.log(this._authenticationService.isAuthenticated());
            alert("Token expired! Login again");
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }
}
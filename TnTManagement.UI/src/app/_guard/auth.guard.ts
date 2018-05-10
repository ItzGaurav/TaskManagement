import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


       
        if (localStorage.getItem('currentUser')) {
            if (this._authenticationService.isAuthenticated()) {
                var userRoles = localStorage.getItem('roles');
                let urlRoles = route.data["roles"] as Array<string>;
                //var URL = typeof (state.url);
                //console.log(URL);
                var x = state.url
                if (x === x.toString()) {
                    var URL = x.toString();
                    if (URL === '/project' || URL.toString() === '/register') {
                        //console.log(URL.toString());
                        let missing = urlRoles.filter(item => userRoles.indexOf(item) > 0);
                        if (missing.length <= 0 || typeof (missing) == 'undefined' || missing === null) {
                            this.router.navigate(['home']);
                        }
                    }
                }
                return true;
            }
            else {

                Swal({
                    type: 'error',
                    title: 'Oops..Token expired!',
                    text: 'Please login again',
                })

                this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            

        }
       
        else {
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }
}
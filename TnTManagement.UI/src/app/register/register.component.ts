import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, AlertService } from '../_services/index';
import { User } from '../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService,
    ) {

    }
    register() {
        this.alertService.clear();
        this.loading = true;
        let _user = new User(this.model.id, this.model.email, this.model.userName, this.model.password, this.model.confirmPassword, this.model.firstName, this.model.lastName);

        
        this.userService.create(_user).subscribe(
            data => {
                this.alertService.success("Registration Successfull", true);
                this.loading = false;
                setTimeout((router: Router) => {
                    this.router.navigate(['login']);
                }, 2000); 
            },
            error => {
               // console.log(error['error']['message']);
                this.alertService.error(error['error']['message']);
                this.loading = false;
            }
        );
        this.loading = true;

    }

}
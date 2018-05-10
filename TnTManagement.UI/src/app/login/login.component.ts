import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';



@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;


    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
    }
    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        document.body.classList.add('bg-img');
    }
    login() {
        this.loading = true;
        //  localStorage.setItem('currentUser', JSON.stringify({ "Name": "Sanjeev" }));

        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(data => {

                this.router.navigate([this.returnUrl]);
            },
            error => {
                // console.log(error['error']['error_description']);
                // alert(error['error'].toString());
                if (error['status'] == 0) {
                    this.alertService.error("Http Service Failure!!");
                    this.loading = false;
                }
                else {
                    this.alertService.error(error['error']['error_description']);
                    this.loading = false;
                    setTimeout(() => {
                        this.alertService.clear();
                    }, 5000); 
                }

            });



    }
}
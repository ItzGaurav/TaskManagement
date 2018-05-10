import { Component, OnInit } from '@angular/core';

import { User, UserReturn } from '../_models/index';
import { UserService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls:['./home.component.css']
})
export class HomeComponent {
    //currentUser: User;
    users: UserReturn[] = [];
    loading = false;
    urlRole = true;
    constructor(private userService: UserService,private alertService : AlertService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       // console.log(this.currentUser);
    }
    ngOnInit() {
        this.loading = true;
        document.body.classList.remove('bg-img');
        this.loadAllUsers();

        var userRoles = localStorage.getItem('roles');
        var forRoles = userRoles.split(',');
        var arrayLength = forRoles.length;
        for (var i = 0; i < arrayLength; i++) {
            if (forRoles[i] === 'Admin') {
                setTimeout(function () {
                    this.urlRole = false;
                }.bind(this), 10);
            }
            else if (forRoles[i] === 'SuperAdmin') {
                setTimeout(function () {
                    this.urlRole = false;
                }.bind(this), 10);
            }
            else {
                setTimeout(function () {
                    this.urlRole = true;
                }, 100);
            }
        }

    }
    loadAllUsers() {
       // console.log("called");
        this.userService.getAllUser().subscribe(
            users => {
                this.users = users
                this.loading = false;
            },
            error => {
            this.alertService.error(error['error']['message']);
            this.loading = false;
        });
    }

}

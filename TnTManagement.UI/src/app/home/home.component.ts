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

    constructor(private userService: UserService,private alertService : AlertService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       // console.log(this.currentUser);
    }
    ngOnInit() {
        this.loading = true;
        document.body.classList.remove('bg-img');
        this.loadAllUsers();
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

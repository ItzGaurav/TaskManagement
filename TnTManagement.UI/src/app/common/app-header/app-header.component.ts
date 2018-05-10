import { Component, Input,OnInit } from '@angular/core';

import { User, UserReturn } from '../../_models/index';
import { UserService } from '../../_services/index';


@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
    currentUser: User;
    users: UserReturn[] = [];
    urlRole = true;
    @Input() public isUserLoggedIn: boolean = false;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.getUser()
    }
    ngOnInit() {
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

    getUser(): boolean  {
       // let loggedIn: boolean = false;
        if (this.currentUser)
        {
            this.isUserLoggedIn = true;
        }
        return this.isUserLoggedIn;
    }
}

import { Component, Input } from '@angular/core';

import { User, UserReturn } from '../../_models/index';
import { UserService } from '../../_services/index';


@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent {
    currentUser: User;
    users: UserReturn[] = [];
   
    @Input() public isUserLoggedIn: boolean = false;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log(this.currentUser);
        this.getUser()
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

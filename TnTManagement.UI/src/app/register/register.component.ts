import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { UserService, AlertService } from '../_services/index';
import { User } from '../_models/user';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
    model: any = {};
    alluser: any;
    public filterQuery = "";
    public rowsOnPage: 5;
    loading = false;
    enableAlert = false;
    constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService,
    ) {

    }
    ngOnInit() {
        document.body.classList.remove('bg-img');
        this.userService.getAllUser().subscribe(
            data => {
                setTimeout(() => {
                    this.alluser = data;
                   // console.log(this.alluser );
                },200)
            },
            error => {
                this.alertService.error("Users list is failed to load");
                this.loading = false;
            }
        )
    }
    register() {
        this.alertService.clear();
        this.loading = true;
        this.enableAlert = true;
        let _user = new User(this.model.id, this.model.email, this.model.userName, this.model.password, this.model.confirmPassword, this.model.firstName, this.model.lastName);
        this.userService.create(_user).subscribe(
            data => {
               
                this.alertService.success("Registration Successfull", true);
                this.loading = false;
                this.ngOnInit();
                this.model = {};
                this.alertService.clear();
                setTimeout(()=>{
                    this.alertService.clear();
                }, 2000)
                //setTimeout((router: Router) => {
                //    this.router.navigate(['login']);
                //}, 2000); 
            },
            error => {

               // console.log(error['error']['message']);
                this.alertService.error(error['error']['message']);
                this.loading = false;
                setTimeout(() => {
                    this.alertService.clear();
                },2000)
     
            }
        );
        this.loading = true;

    }
    public removeUser(item: any) {
        Swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Project,Task and Activities!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.userService.deleteUser(item.id).subscribe(
                    data => {
                        if (data) {
                            this.alluser = _.filter(this.alluser, (elem) => elem != item);
                            Swal(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            );
                        }
                        else {
                            Swal({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            })
                        }
                    },
                    error => {
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal(
                    'Cancelled',
                    'Data is safe :)',
                    'error'
                )
            }
        })
    }
}
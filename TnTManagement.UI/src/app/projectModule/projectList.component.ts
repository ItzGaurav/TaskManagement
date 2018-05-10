import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UrlHelper } from '../_helpers/index';
import { ProjectService } from '../_services/index';
import * as _ from 'lodash';
//import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
//import { ModalService } from '../modal/index';

@Component({
    selector: 'projectlist',
    moduleId: module.id,
    templateUrl: 'projectList.component.html',
})

export class ProjectListComponent implements OnInit {
    public alldata: any;
    public filterQuery = "";
    public rowsOnPage: 5;
    //public sortBy = "plannedStartDate";
    //public sortOrder = "asc";
    loading = false;
    showDialog = false;
    editbutton = true;
    //private bodyText: string;
    //@ViewChild('childModal') childModal: ModalDirective;
    constructor(private _httpClient: HttpClient, private _projectService: ProjectService) { //,private modalService: ModalService


    }
    ngOnInit(): void {
        this.loading = true;

        //console.log(this.editbutton);

        //this.bodyText = 'This text can be updated in modal 1';
        this._projectService.getAllProjectList().subscribe(
            data => {
                setTimeout(() => {
                    this.alldata = data;
                    this.loading = false;
                    this.editbutton = true;
                });

            },
            error => {
                alert("Project list is not loaded");
                this.loading = false;
            }

        )
    }
    //@Output() myEvent = new EventEmitter();
    @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
    onEditClick(item: any) {
        this.editbutton = false;
        this.editEvent.emit(item);
    }

    public sortByWordLength = (a: any) => {
        return a.projectName.length;
    }
    public removeItem(item: any) {
        Swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Project,Task and Activities!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this._projectService.deleteProject(item.projectId).subscribe(
                    data => {
                        if (data) {
                            this.alldata = _.filter(this.alldata, (elem) => elem != item);
                            Swal(
                                'Deleted!',
                                'Your project has been deleted.',
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
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }
    //openModal(id: string) {
    //    this.modalService.open(id);
    //}

    //closeModal(id: string) {
    //    this.modalService.close(id);
    //}
    //open(content: any) {
    //    this.modalService.open(content).result.then((result) => {
    //        this.closeResult = `Closed with: ${result}`;
    //    }, (reason) => {
    //        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //    });
    //}

    //private getDismissReason(reason: any): string {
    //    if (reason === ModalDismissReasons.ESC) {
    //        return 'by pressing ESC';
    //    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //        return 'by clicking on a backdrop';
    //    } else {
    //        return `with: ${reason}`;
    //    }
    //}
}

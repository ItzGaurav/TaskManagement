import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
//import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { ProjectService, UserService, AlertService } from '../_services/index';
import { Project } from '../_models/project';
import { ProjectListComponent } from '../projectModule/projectList.component';

import Swal from 'sweetalert2';
//import { ModalService } from '../modal/index';

@Component({
    providers: [ProjectListComponent],
    moduleId: module.id,
    templateUrl: 'project.component.html'

})

export class ProjectComponent implements OnInit {
    model: any = {};
    loading = false;
    editform = false;
    editdata: any = {};
    //private bodyText: string;
    statuses = [
        { name: 'Open' },
        { name: 'Pending' },
        { name: 'Closed' },
        //{ isDivider: true },
        { name: 'Ongoing' }
    ];
    constructor(private _projectService: ProjectService, private _userService: UserService, private _alertService: AlertService,
        private builder: FormBuilder, private _sanitizer: DomSanitizer,
        private listcomp: ProjectListComponent) {
        this.model.plannedStartDate = new Date();
        //combProjectEdit = new ProjectEditComponent(NgbModal);
        this.model.plannedEndDate = new Date();
        this.loadResources();
    }
    
    public resources: any = {};

    
    public userresource: FormControl;
    ngOnInit() {
        document.body.classList.remove('bg-img');
        this.userresource = new FormControl('');
      //  this.clearForm();
      //  this.bodyText = 'This text can be updated in modal 1';
    }

    loadResources() {
        this._userService.getResources().subscribe(
            data => {
                this.resources = data;
                
            },
            error => {
                this._alertService.error("Resources not loaded", false);
            }
        );
    }

    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    createProject() {
        this.loading = true;
        let proj = new Project;
        proj.projectName = this.model.projectName;
        proj.epicId = this.model.epicId;
        proj.ccNumber = this.model.ccNumber;
        proj.projectStatus = this.model.projectStatus;
        proj.plannedStartDate = this.model.plannedStartDate;
        proj.plannedEndDate = this.model.plannedEndDate;
        proj.plannedEffort = this.model.plannedEffort;
        proj.resourceId = this.model.resource['id'];
        //proj.resource = this.model.resorce['name'];
        // console.log(proj);
        this._projectService.createProject(proj).subscribe(
            data => {
                Swal(
                    'Success!',
                    'Project Created Successfully!',
                    'success'
                ).then()
                this.loading = false;
               // this.ngOnInit(); 
                this.model = {};
                this.listcomp.ngOnInit();
                //setTimeout(() => {
                //    this._alertService.clear();
                //},2000)

            },
            error => {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    //footer: '<a href>Why do I have this issue?</a>',
                })
                this.loading = false;
            }
        )
    }
    clearForm() {
        this.model.projectName = '';
        this.model.epicId = '';
        this.model.ccNumber = '';
        this.model.projectStatus = '';
        this.model.plannedStartDate = new Date();
        this.model.plannedEndDate = new Date();
        this.model.plannedEffort = '';
        this.model.resource = null;
    }
  
    editEventFired(item: any) {
        //console.log(item);
        this.editform = true;
        this.editdata = item
    }
    onReturnClick() {
        this.loading = true;
        setTimeout(()=>{
            this.editform = false;
            this.listcomp.editbutton = true;
            this.loading = false;
        }, 100); 
    }
}
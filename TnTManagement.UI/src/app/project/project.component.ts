import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';


import { ProjectService, UserService, AlertService } from '../_services/index';
import { Project } from '../_models/project';
import { ProjectListComponent } from '../projectModule/projectList.component';

@Component({
    providers: [ProjectListComponent],
    moduleId: module.id,
    templateUrl: 'project.component.html'

})

export class ProjectComponent implements OnInit {
    model: any = {};
    loading = false;
    statuses = [
        { name: 'Open' },
        { name: 'Pending' },
        { name: 'Closed' },
        //{ isDivider: true },
        { name: 'Ongoing' }
    ];
    constructor(private _projectService: ProjectService, private _userService: UserService, private _alertService: AlertService,
        private builder: FormBuilder, private _sanitizer: DomSanitizer,
        private comp: ProjectListComponent) {
        this.model.plannedStartDate = new Date();
        this.model.plannedEndDate = new Date();
        this.loadResources();
    }
    
    public resources: any = {};

    
    public userresource: FormControl;
    ngOnInit() {
        document.body.classList.remove('bg-img');
        this.userresource = new FormControl('')
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
        // console.log(proj);
        this._projectService.createProject(proj).subscribe(
            data => {
                this._alertService.success("Project created successfully", false);
                this.loading = false;
            
                this.comp.ngOnInit();
                setTimeout(()=>{
                    this.clearForm();
                },2000)

            },
            error => {
                alert("error");
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
}
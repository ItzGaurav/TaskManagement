import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ProjectService, UserService, AlertService } from '../_services/index';
import { Project } from '../_models/project';
import { ProjectListComponent } from '../projectModule/projectList.component';
import Swal from 'sweetalert2';

@Component({
    providers: [],
    moduleId: module.id,
    selector: 'projectedit',
    templateUrl: 'projectEdit.component.html'

})
export class ProjectEditComponent implements OnInit {
    model: any = {};
    loading = false;
    @Input() myData: any;
    statuses = [
        { name: 'Open' },
        { name: 'Pending' },
        { name: 'Closed' },
        { name: 'Ongoing' }
    ];
    public resources: any = {};
    public userresource: FormControl;

    constructor(private _projectService: ProjectService, private _userService: UserService, private _alertService: AlertService,
        private builder: FormBuilder, private _sanitizer: DomSanitizer) {
     
    }

    ngOnInit() {
        this.model = this.myData;
        this.userresource = new FormControl('');
        this.loadResources();
    }
    loadResources() {
        this._userService.getResources().subscribe(
            data => {
                this.resources = data;
                for (let entry of data) {
                    if (this.model.resourceId == entry['id']) {
                        console.log("loaded");
                        console.log(entry.name);
                        this.userresource = new FormControl(entry.name);
                    }
                }
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

    @Output() returnBack: EventEmitter<any> = new EventEmitter<any>();
    onReturnClick($event: any) {
        this.returnBack.emit($event);
    }

    valueChanged(newVal:any) {
        this.model.resourceId = newVal.id;
       // alert(this.model.resourceId);
        this.userresource = new FormControl(newVal);
    }
    updateProject() {
        this.loading = true;
        let proj = new Project;
        proj.projectId = this.model.projectId
        proj.projectName = this.model.projectName;
        proj.epicId = this.model.epicId;
        proj.ccNumber = this.model.ccNumber;
        proj.projectStatus = this.model.projectStatus;
        proj.plannedStartDate = this.model.plannedStartDate;
        proj.plannedEndDate = this.model.plannedEndDate;
        proj.plannedEffort = this.model.plannedEffort;
        proj.resourceId = this.model.resourceId;
        proj.actualStartDate = this.model.actualStartDate;
        proj.actualEndDate = this.model.actualEndDate;
        proj.actualEffort = this.model.actualEffort;
        console.log(proj);
        this._projectService.updateProject(proj).subscribe(
            data => {
                Swal(
                    'Success!',
                    'Project updated successfully!',
                    'success'
                ).then()
                this.loading = false;
               // this.ngOnInit();
              //  this.comp.ngOnInit();
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

}
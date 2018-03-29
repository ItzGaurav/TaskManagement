import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';


import { ProjectService, UserService  } from '../_services/index';
import { Project } from '../_models/project';



@Component({
    moduleId: module.id,
    templateUrl : 'project.component.html'
})

export class ProjectComponent implements OnInit {
    model: any = {} ;
    loading = false;
    statuses = [
        { name: 'Open' },
        { name: 'Pending' },
        { name: 'Closed' },
        //{ isDivider: true },
        { name: 'Ongoing'}
    ];
    constructor(private _projectService: ProjectService, private _userService: UserService, private builder: FormBuilder, private _sanitizer: DomSanitizer) {
        this.model.plannedStartDate = new Date();
        this.model.plannedEndDate = new Date();
        this.loadResources();
    }
    public continents = [{
        id: 1,
        name: 'Asia',
        population: '4,157,300,000'
    }, {
        id: 2,
        name: 'Africa',
        population: '1,030,400,000'
    }, {
        id: 3,
        name: 'Europe',
        population: '738,600, 000'
    }, {
        id: 4,
        name: 'North America',
        population: '461,114,000'
    }, {
        id: 5,
        name: 'South America',
        population: '390,700,000'
    }, {
        id: 6,
        name: 'Australia',
        population: '36,700,000'
    }, {
        id: 7,
        name: 'Antartica',
        population: 0
    }
    ];
    public resources: any = {};
    

    public continent: FormControl;
    ngOnInit() {
        

        this.continent = new FormControl('')
    }
    loadResources() {
        this._userService.getResources().subscribe(
            data => {
                this.resources = data;
            },
            error => {
                alert("resources not loaded");
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
        console.log(proj);
        this._projectService.createProject(proj).subscribe(
            data => {
                alert("success");
                this.loading = false;
            },
            error => {
                alert("error");
                this.loading = false;
            }
        )
    }

}
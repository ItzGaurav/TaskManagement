import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlHelper } from '../_helpers/index';
import { ProjectService } from '../_services/index';
import * as _ from 'lodash';

//import Swal from 'sweetalert2';

@Component({
    selector: 'projectlist',
    moduleId: module.id,
    templateUrl: 'projectList.component.html',
})

export class ProjectListComponent implements OnInit {
    public data: any;
    public filterQuery = "";
    public rowsOnPage: 5;
    public sortBy = "plannedStartDate";
    public sortOrder = "asc";
    loading = false;
    showDialog = false;
    constructor(private _httpClient: HttpClient, private _projectService: ProjectService) {

    }
    ngOnInit(): void {
        this.loading = true;
        console.log("called");
        this._projectService.getAllProjectList().subscribe(
            data => {
                setTimeout(() => {
                    this.data = data;
                    this.loading = false;
                });
              
            },
            error => {
                alert("Project list is not loaded");
                this.loading = false;
            }

        )
    }

    public sortByWordLength = (a: any) => {
        return a.projectName.length;
    }
    public removeItem(item: any) {
        this.data = _.filter(this.data, (elem) => elem != item);
        console.log("Remove: ", item.projectName);
    }
}
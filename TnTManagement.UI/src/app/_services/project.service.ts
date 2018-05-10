import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlHelper } from '../_helpers/index';
import {Project } from '../_models/index';

@Injectable()

export class ProjectService {
    constructor(private httpClient: HttpClient) {

    }
    createProject(project: Project) {
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.createProject, project);
    }
    updateProject(project: Project) {
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.updateProject, project);
    }
    getAllProjectDropdown() {
        return this.httpClient.get(UrlHelper.apiEndpoint + UrlHelper.getAllProjects);
    }
    getAllProjectList() {
        return this.httpClient.get(UrlHelper.apiEndpoint + UrlHelper.getAllProjectList);
    }
    deleteProject(projectId: number) {
        //var request = { "projectId": projectId };
        //console.log(UrlHelper.apiEndpoint + UrlHelper.deleteProject + "projectId=" + projectId);
        //debugger;
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.deleteProject  + projectId,null);
    }
}
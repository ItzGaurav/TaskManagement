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
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Task, TaskList } from '../_models/tasks';
import { UrlHelper } from '../_helpers/urlHelper.component';

@Injectable()

export class TaskService {
    constructor(private httpClient: HttpClient) {

    }
    createAllTasks(task: Task[]) {
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.createTasks, task, { headers: new HttpHeaders().set('Content-Type', 'application/json') }
        );
    }
}


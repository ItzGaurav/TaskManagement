import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { TaskType, TaskList } from '../_models/tasks';
import { UrlHelper, JwtHelper } from '../_helpers/index';

@Injectable()

export class TaskService {
    constructor(private httpClient: HttpClient, public jwtHelper: JwtHelper) {

    }
    createAllTasks(task: TaskList) {
       // console.log(JSON.stringify(task));
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.createTasks, task, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }
    getTaskByProject(projectId: number) {
        return this.httpClient.get(UrlHelper.apiEndpoint + UrlHelper.getTaskbyProject + "projectId="+ projectId);
    }
    getAllTaskByResource() {
        return this.httpClient.get(UrlHelper.apiEndpoint + UrlHelper.getAllTaskByresource);
    }
    deleteTask(taskId: number) {
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.deleteTask + taskId, null);
    }
    checkCreator(token : string) {
        var pJson = this.jwtHelper.parseJwt(token);
        return pJson.Id;
    }
}


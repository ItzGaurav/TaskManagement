import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UrlHelper } from '../_helpers/index';
import { ActivityModel } from '../_models/index';

@Injectable()

export class ActivityService {
    constructor(private _httpClient: HttpClient) {

    }
    createActivities(activityModel: ActivityModel[]) {
        return this._httpClient.post(UrlHelper.apiEndpoint + UrlHelper.createActivities, activityModel, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }
    getAllActivitiesByResource() {
        return this._httpClient.get(UrlHelper.apiEndpoint + UrlHelper.getAllActivitiesByResource);
    }
    deleteActivity(activityId: number) {
        return this._httpClient.post(UrlHelper.apiEndpoint + UrlHelper.deleteActivity + activityId, null);
    }
    exportActivtyResportByResource() {
        return this._httpClient.get(UrlHelper.apiEndpoint + UrlHelper.exportActivityByResource);

    }
    //downloadFile(data: Response) {
    //    var blob = new Blob([data], { type: 'application/ms-excel' });
    //    var url = window.URL.createObjectURL(blob);
    //    window.open(url);
    //}
}
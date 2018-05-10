import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlHelper } from '../_helpers/index';
@Injectable()

export class ReportService {
    constructor(private _httpClient: HttpClient) {
    }
    getReportsByUser(userId: string, fromDate: string, toDate: string) {
        return this._httpClient.get(UrlHelper.apiEndpoint + UrlHelper.acivityReportOfUser + 'userId=' + userId + '&fromDate=' + fromDate + '&toDate=' + toDate);
    }
}


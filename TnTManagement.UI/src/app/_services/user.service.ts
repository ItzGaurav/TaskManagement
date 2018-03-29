import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User,UserReturn,Resource } from '../_models/index';
import { UrlHelper } from '../_helpers/urlHelper.component';

@Injectable()


export class UserService {
    constructor(private httpClient: HttpClient) {

    }
    create(user: User) {
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.userCreateUrl, user);
    }
    getAllUser() {
        return this.httpClient.get<UserReturn[]>(UrlHelper.apiEndpoint + UrlHelper.getAllUserUrl);
    }
    getResources() {
        return this.httpClient.get<Resource[]>(UrlHelper.apiEndpoint + UrlHelper.getResourceUrl);
    }
}
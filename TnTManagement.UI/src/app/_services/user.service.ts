import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserReturn, Resource,Password } from '../_models/index';
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
    changePassword(passwordModel: Password) {
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.changePasswordUrl, passwordModel, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }
    deleteUser(userId: string) {
        return this.httpClient.post(UrlHelper.apiEndpoint + UrlHelper.deleteUser + userId, null);
    }
}
import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UrlHelper, JwtHelper } from '../_helpers/index';


import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()

export class AuthenticationService {
 
    private loginUrl = UrlHelper.apiEndpoint + UrlHelper.loginUrl;
    public token: string;
    public roles: string;
    constructor(private httpClient: HttpClient, public jwtHelper: JwtHelper) { //, 
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    login(username: string, password: string): Observable<boolean> {
        var body = 'username=' + username + '&password=' + password + '&grant_type=password';
       // console.log(body);
        return this.httpClient.post(this.loginUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') },
        ).map((response: Response) => {
            const token = response && response["access_token"];
            if (token) {
                this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ username, token }));
              //  console.log(this.token);
                        
                var pJson = this.jwtHelper.parseJwt(token);
                if (typeof pJson.role === 'string') {
                    this.roles = pJson.role.split();
                   // console.log(this.roles );
                } else {
                    this.roles = pJson.role;
                   // console.log(this.roles);
                }
                //console.log(this.roles)
                localStorage.setItem('roles', this.roles);
                return true;
            }
            else {
                return false;
            }
        }).catch(res => Observable.throw(res));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    public isAuthenticated(): boolean {
        
        let token = localStorage.getItem('currentUser');
        //console.log(this.jwtHelper.isTokenExpired(token));
       
        var parsedData = JSON.parse(token);
      //  console.log(parsedData['token']);

        if (!this.jwtHelper.isTokenExpired(parsedData['token'])) {
            //console.log("expired");
            this.logout();
            return false;
         
        }
        else {
          //  console.log("not expired");
            return true;
        }
        //let response = false;
       
        //this.httpClient.get(UrlHelper.apiEndpoint + UrlHelper.tokenValidUrl).subscribe(
        //    data => {
        //        response = true;
        //    },
        //    error => {
        //        this.logout();
        //    }
        //);
        //alert(response);
        //return response;
    }


        //login(username: string, password: string): Observable<boolean> {
    //    const body = new HttpParams()
    //        //.set('grant_type', 'password')
    //        .set('UserName', 'sanju')
    //        .set('Email', 'user@sa.com')
    //        .set('Password', 'Pass@123')
    //        .set('ConfirmPassword', 'Pass@123')
    //        .set('FirstName', 'Sanj')
    //        .set('LastName', 'S');
    //    var data = {
    //        "Email": "user@sa.com",
    //        "UserName": "user",
    //        "Password": "Pass@123",
    //        "ConfirmPassword": "Pass@123",
    //        "FirstName": "Manu",
    //        "LastName": "S"
    //    }            

    //    console.log(JSON.stringify(data));
    //    return this.httpClient.post('http://localhost:62822/api/user/create', JSON.stringify(data), { headers: new HttpHeaders().set('Content-Type', 'application/json') },
    //    ).map((response: Response) => {
    //        const token = response.json() && response.json().access_token;
    //        if (token) {
    //            this.token = token;
    //            localStorage.setItem('currentUser', JSON.stringify({ username, token }));
    //            return true;
    //        }
    //        else {
    //            return false;
    //        }
    //    })
    //}

}


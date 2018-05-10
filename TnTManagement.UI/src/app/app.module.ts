import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { DataTableModule } from 'angular2-datatable';

//import { JwtModule } from '@auth0/angular-jwt';
//import { AuthModule } from 'angular2-auth';

import { fakeBackendProvider, JwtHelper } from './_helpers/index';

import { routing } from './app.routing';
import { AuthGuard } from './_guard/index';
import { JwtInterceptor } from './_helpers/index';
//import { EqualValidator } from './_directives/index';
import { AuthenticationService, UserService, ProjectService, TaskService, ActivityService, ReportService } from './_services/index'; //AlertService,


import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { TaskComponent, TaskChildComponent } from './task/index';
import { ProjectModule } from "./projectModule/project.module";
import { ActivityComponent } from "./activity/index";
import { AlertModule } from '../app/_directives/alert.module';
import { AppHeaderModule } from './common/app-header/app-header.module';
import { ReportComponent } from './report/index';
//import { DialogModule } from './common/app-dialog/dialog.module';

//import { AUTH_PROVIDERS } from 'angular2-jwt';

//import { AuthHttp, AuthConfig } from '@auth0/angular2-jwt';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        routing,
        ProjectModule,
        Ng2AutoCompleteModule,
        AppHeaderModule,
        AlertModule,
      //  DialogModule,
        DataTableModule,
        //JwtModule.forRoot({
        //    config: {
        //        tokenGetter: () => {
        //            return localStorage.getItem('token');
        //        },
        //        whitelistedDomains: ['localhost:3000']
        //    }
        //}),
        // AuthModule,
        //   JwtHelperService,

    ],

    declarations: [
        AppComponent,
        //AppHeaderComponent,
        //AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TaskComponent,
        TaskChildComponent,
        ActivityComponent,
        ReportComponent,
      //  ResetPasswordComponent,
        //EqualValidator
    ],


    providers: [
        AuthGuard,
        // AuthGuard, ...AUTH_PROVIDERS, AuthenticationService,
      //  AlertService,
        AuthenticationService,
        UserService,
        ProjectService,
        JwtHelper,
        TaskService,
        ActivityService,
        ReportService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        fakeBackendProvider,

    ],

    bootstrap: [AppComponent],

})
export class AppModule { }
[

]
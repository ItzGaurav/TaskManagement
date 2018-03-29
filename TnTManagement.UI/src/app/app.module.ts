import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { routing } from './app.routing';
import { AuthGuard } from './_guard/index';
import { JwtInterceptor } from './_helpers/index';
import { EqualValidator, AlertComponent } from './_directives/index';
import { AlertService, AuthenticationService, UserService, ProjectService , TaskService } from './_services/index';
import { AppHeaderComponent } from './common/app-header/app-header.component';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { TaskComponent, TaskChildComponent } from './task/index';
import { ProjectComponent } from './project/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        routing,
        Ng2AutoCompleteModule,
       
    ],
 
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TaskComponent,
        TaskChildComponent,
        ProjectComponent,
        EqualValidator],


    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ProjectService,
        TaskService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        }
    ],

    bootstrap:    [ AppComponent ]
})
export class AppModule { }

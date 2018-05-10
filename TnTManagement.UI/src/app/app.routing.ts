import { Routes, RouterModule, RouterLinkActive  } from '@angular/router';

//import { AppHeaderComponent } from './common/app-header/app-header.component';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { RegisterComponent } from './register/index';
import { TaskComponent, TaskChildComponent } from './task/index'
import { ProjectComponent } from './project/index';
import { ActivityComponent } from './activity/index';
import { ReportComponent } from './report/index';
import { AuthGuard } from './_guard/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Admin', 'User'] } },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Admin', 'User'] } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Admin'] } },
    { path: 'task', component: TaskComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Admin', 'User'] } },
    { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Admin', 'User'] } },
    { path: 'project', component: ProjectComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Admin'] } },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Admin'] } },
    { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
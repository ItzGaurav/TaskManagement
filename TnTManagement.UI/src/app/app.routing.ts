import { Routes, RouterModule, RouterLinkActive  } from '@angular/router';

//import { AppHeaderComponent } from './common/app-header/app-header.component';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { RegisterComponent } from './register/index';
import { TaskComponent, TaskChildComponent } from './task/index'
import { ProjectComponent } from './project/index';
import { AuthGuard } from './_guard/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
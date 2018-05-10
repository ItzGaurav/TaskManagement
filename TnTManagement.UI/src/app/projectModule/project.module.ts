import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
//import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
//import { ProjectService } from '../_services/index';
import { ProjectComponent } from '../project/index';

import { ProjectListComponent } from './projectList.component';
import { ProjectEditComponent } from './projectEdit.component';

import { DataPipeFilter } from './poject-filter.pipe';
import { AppHeaderModule } from '../common/app-header/app-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { AlertModule } from '../_directives/alert.module';
import { DialogModule } from '../common/app-dialog/dialog.module';
import { AlertService, AuthenticationService, UserService, ProjectService, TaskService } from '../_services/index';
import { DataTableModule } from 'angular2-datatable';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ModalModule } from 'ngx-bootstrap/modal';

//import { ModalComponent,ModalService } from '../modal/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DataTableModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2AutoCompleteModule,
        AlertModule,
        AppHeaderModule,
        //NgbModule.forRoot(),
        DialogModule,
        //SweetAlert2Module.forRoot({
        //    buttonsStyling: false,
        //    customClass: 'modal-content',
        //    confirmButtonClass: 'btn btn-primary',
        //    cancelButtonClass: 'btn'
        //}),
    ],
    providers: [ProjectService, AlertService],
    declarations: [ProjectListComponent, DataPipeFilter, ProjectComponent, ProjectEditComponent],
    exports: [ProjectListComponent]
    
})

export class ProjectModule {

}
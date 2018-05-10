import { NgModule } from '@angular/core';

import { AppHeaderComponent } from './app-header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ResetPasswordComponent } from '../resetPassword/resetPassword.component';
import { AlertModule } from '../../_directives/alert.module';
import { EqualValidator } from '../../_directives/index';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
    imports: [RouterModule, CommonModule, BrowserModule, BrowserAnimationsModule, FormsModule, AlertModule, DataTableModule],
    //providers: [],
    declarations: [AppHeaderComponent, ResetPasswordComponent, EqualValidator],
    exports: [AppHeaderComponent]

})
export class AppHeaderModule {

}
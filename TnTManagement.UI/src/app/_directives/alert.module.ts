import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AlertService } from '../_services/index';
import { AlertComponent } from './alert.component';

@NgModule({
    imports: [CommonModule, BrowserModule],
    providers: [AlertService],
    declarations: [AlertComponent],
    exports: [AlertComponent]

})
export class AlertModule {

}
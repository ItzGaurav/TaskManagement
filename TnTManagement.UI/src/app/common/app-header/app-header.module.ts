import { NgModule } from '@angular/core';

import { AppHeaderComponent } from './app-header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [RouterModule,CommonModule, BrowserModule],
    //providers: [],
    declarations: [AppHeaderComponent],
    exports: [AppHeaderComponent]

})
export class AppHeaderModule {

}
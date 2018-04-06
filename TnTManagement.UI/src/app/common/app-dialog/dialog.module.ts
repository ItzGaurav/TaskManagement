import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { AppComponent } from './app.component';
import { DialogComponent } from './dailog.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
            DialogComponent,
    ],
    providers: [],
    exports: [DialogComponent]

})
export class DialogModule {
}
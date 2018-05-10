import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService, AlertService, ReportService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'report.component.html'
})

export class ReportComponent {
    public resources: any = {};
    public userresource: FormControl;
    public resource: any;
    public activities: any;
    public rowsOnPage: 5;
    public fromDate : string = '';
    public toDate : string = '';
    loading = false;
    constructor(private _userService: UserService,
        private _alertService: AlertService, private _reportService: ReportService,
        private builder: FormBuilder, private _sanitizer: DomSanitizer, ) {

        this.loadResources();
    }
    ngOnInit() {
        document.body.classList.remove('bg-img');
        this.userresource = new FormControl('');
    }
    loadResources() {
        this._userService.getResources().subscribe(
            data => {
                this.resources = data;

            },
            error => {
                this._alertService.error("Resources not loaded", false);
            }
        );
    }
    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
    getActivityByUser() {
        var resourceId = '';
        if (this.resource != undefined) {
             resourceId = this.resource['id'];
        }
        if (resourceId == undefined) {
            resourceId = '';
        }
        //console.log(resourceId);
        //alert(resourceId);
        //console.log(this.toDate);
        this._reportService.getReportsByUser(resourceId, this.fromDate, this.toDate).subscribe(
            data => {
                this.activities = data;
                //console.log(this.activities);
            },
            error => {

            }
        )
    }
}
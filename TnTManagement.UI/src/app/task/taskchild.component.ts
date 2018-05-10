import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
    moduleId: module.id,
    selector: 'taskForm',
    templateUrl: './taskchild.component.html',
})
export class TaskChildComponent implements OnInit {
    constructor(private _userService: UserService, private _sanitizer: DomSanitizer) {
        this.loadResources();
    }
    public resources: any = {};
    @Input('group')
    public taskForm: FormGroup;
    tasktypes = [
        { tasktype: 'Design' },
        { tasktype: 'Development' },
        { tasktype: 'Unit Testing' },
        { tasktype: 'Training' },
        { tasktype: 'QA Support' },
        { tasktype: 'Meeting' },
        { tasktype: 'Discussion' },
        { tasktype: 'Rework' },
        { tasktype: 'Code Review' },
        { tasktype: 'Design Review' },
        { tasktype: 'Documentation' },
        { tasktype: 'Interview' },
        { tasktype: 'Others' }
    ];

    public userresource: FormControl;
    ngOnInit() {
        this.userresource = new FormControl('')
    }
    loadResources() {
        this._userService.getResources().subscribe(
            data => {
               
                this.resources = data;
            },
            error => {
                alert("resources not loaded");
            }
        );
    }
    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }


}

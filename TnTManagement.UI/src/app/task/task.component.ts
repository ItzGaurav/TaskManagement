import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TaskType, TaskList } from '../_models/tasks';
import { TaskService, ProjectService, AlertService } from '../_services/index';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    //directives: [FORM_DIRECTIVES]
})
export class TaskComponent implements OnInit {
    public myForm: FormGroup;
    public options: any = [];
    public allTask: any;
    loading = false;
    public filterQuery = "";
    public rowsOnPage: 5;

    constructor(private _fb: FormBuilder, private taskService: TaskService,
        private _projectService: ProjectService,
        private _alertService: AlertService
    ) {
        this.loadProjects();
       
      
    }
    ngOnInit() {
        document.body.classList.remove('bg-img');
        this.myForm = this._fb.group({
            projectId: [0, [Validators.required]],
            taskName: ['', [Validators.required]],
            plannedStartDate: ['', [Validators.required]],
            plannedEndDate: ['', [Validators.required]],
            description: ['', [Validators.required]],
            tasktype: this._fb.array([])
        });
        this.myForm.controls['plannedStartDate'].setValue(this.currentDate());
        this.myForm.controls['plannedEndDate'].setValue(this.currentDate());
        this.addTaskType();
        this.loadTasks();
        
    }
    loadTasks() {
        this.loading = true;
        this.taskService.getAllTaskByResource().subscribe(
            data => {
                this.allTask = data;
                this.loading = false;
            },
            error => {
                this._alertService.error("Tasks is faild to load", false);
                this.loading = false;
            }
        )
    }
    initAddress() {
        return this._fb.group({
            tasktype: ['', Validators.required],
            plannedEffort: ['', Validators.compose([Validators.required, this.nonZero])],
            resource: ['', Validators.required]

        });
    }
    nonZero(control: FormControl): { [key: string]: any; } {
        if (Number(control.value) < 0) {
            return { nonZero: true };
        } else {
            return null;
        }
    }
    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0, 10);
    }
    addTaskType() {
        const control = <FormArray>this.myForm.controls['tasktype'];
        const addrCtrl = this.initAddress();

        control.push(addrCtrl);

        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeTasks(i: number) {
        const control = <FormArray>this.myForm.controls['tasktype'];
        control.removeAt(i);
    }

    loadProjects() {
        this._projectService.getAllProjectDropdown().subscribe(
            data => {
               // alert(JSON.stringify(data));
                this.options = data; 
            }, error => {
                alert("Failed to load Projects");
            })
    }

    
    save(model: TaskList) {
        this.taskService.createAllTasks(this.myForm.value).subscribe(
            data => {
                Swal(
                    'Success!',
                    'Tasks Created Successfully!',
                    'success'
                ).then()
                this.loading = false;
                this.ngOnInit();
        },
            error => {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });;
        this.myForm.reset()
    }

    public deleteTask(item: any) {
        if (this.boolCreator(item.createdId)) {
            Swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this Task and Activities!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            }).then((result) => {
                if (result.value) {
                    this.taskService.deleteTask(item.taskId).subscribe(
                        data => {
                            if (data) {
                                this.allTask = _.filter(this.allTask, (elem) => elem != item);
                                Swal(
                                    'Deleted!',
                                    'Your Task has been deleted.',
                                    'success'
                                );
                            }
                            else {
                                Swal({
                                    type: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                })
                            }
                        },
                        error => {
                            Swal({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            })
                        }
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal(
                        'Cancelled',
                        'Your task is safe :)',
                        'error'
                    )
                }
            })
        }
        else {
            Swal({
                type: 'error',
                title: 'No',
                text: 'You can delete the task which is created by you!',
            })
        }
        
    }

    boolCreator(createdId : string): boolean {
        if (localStorage.getItem('currentUser')) {
            let token = localStorage.getItem('currentUser');
            var parsedData = JSON.parse(token);
            //console.log(parsedData);
            var data = this.taskService.checkCreator(parsedData['token']);
            //console.log(createdId);
          //  console.log(data);

            if (data == createdId) {
                return true;
            }
            else return false;
        }
        else return false;
    }

}


import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms'
//import { ProjectInfo } from '../ProjectInfo';
//import { TaskInfo } from '../TaskInfo';
import { ProjectInfo, TaskInfo, ActivityInfo, ActivityModel } from '../_models/index';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { TaskService, ProjectService, ActivityService } from '../_services/index';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/rx';
import { UrlHelper } from '../_helpers/index';

import Swal from 'sweetalert2';


@Component({
    selector: 'my-ac',
    templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit {
    tsFormGroup: FormGroup;
    public rowsOnPage: 5;
  //  public sortOrder = "asc";
    loading = false;

    projectModel = new ProjectInfo();
    projects: ProjectInfo[];
  
   // public projects: any = [];

    activityCount: number = 1;

    tasklist: Array<TaskInfo[]> = [];

    activityInfoList: Array<ActivityModel> = [];
    allActivites : any;

    statusMessage: string = 'Default Error Message';

    constructor(private fb: FormBuilder, private _http: Http, private router: Router,
        private _projectService: ProjectService, private _taskService: TaskService, private _activityService: ActivityService) {


    }

    get NewActivity(): FormArray {
        return <FormArray>this.tsFormGroup.get('newActivityControl'); //<FormArray> castingcontrols.newActivityControl; //<FormArray> casting
    }


    ngOnInit() {
        document.body.classList.remove('bg-img');
        this.tsFormGroup = this.fb.group({
            newActivityControl: this.fb.array([this.buildTimeSheetsForm()])
        });
        
        this.getProject()
            .subscribe(project => this.projects = project,
            error => { console.error(error) });
        this.statusMessage = 'Problem with the service. Please start the Api service';


        this.getAllActivitiesByResource();

    }
    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0, 10);
    }
    setNotification(notifyVia: string): void {

    }

    buildTimeSheetsForm(): FormGroup {
        return this.fb.group({
            projectId: [0, Validators.compose([Validators.required, this.checkSelectbox])],
            taskId: [0, Validators.compose([Validators.required, this.checkSelectbox])],
            activityDate: [this.currentDate(), [Validators.required]],
            hoursSpent: ['', Validators.compose([Validators.required, this.nonZero])],
            comment: '',
        });
   
    }
    nonZero(control: FormControl): { [key: string]: any; } {
        if (Number(control.value) < 0) {
            return { nonZero: true };
        } else {
            return null;
        }
    }

    checkSelectbox(control: FormControl): { [key: string]: any; }{
        if (control.value == 0) {
            return { nonZero: true };
        } else {
            return null;
        }
    }
    addNewRow(): void {
        this.NewActivity.push(this.buildTimeSheetsForm());
        this.activityCount++;
    }


    removeActivity(i: number) {
        const control = <FormArray>this.tsFormGroup.get('newActivityControl');
        control.removeAt(i);
        this.activityCount--;
    }

    getProject(): Observable<ProjectInfo[]> {

        return this._projectService.getAllProjectDropdown() //this._http.get(UrlHelper.apiEndpoint + UrlHelper.getAllProjects) //"http://localhost:49827/api/Project"
            .map(res=>res) // (response: Response) => <ProjectInfo[]>response.json()
            .catch(this.handleError);
      
        //this._projectService.getAllProjectDropdown().subscribe(
        //    data => {
        //        // alert(JSON.stringify(data));
        //        this.projects = data;
        //    }, error => {
        //        alert("Failed to load Projects");
        //    })
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }

    projectDDChanged(i: number) {
        this.loading = true;
        const control = this.tsFormGroup.get('newActivityControl')['controls'];
        
        var selectedProjectId = control[i].controls.projectId.value;

        this.getTask(selectedProjectId).subscribe(
            task => this.tasklist[i] = task,
            error => { console.error(error) }
        );
        this.loading = false;
      //  console.log(JSON.stringify(this.tasklist[i]));
    }



    getTask(projectId: number): Observable<TaskInfo[]> {
      //  console.log(projectId);
        return this._taskService.getTaskByProject(projectId)  //this._http.get(UrlHelper.apiEndpoint + UrlHelper.getTaskbyProject + projectId)   // http://localhost:49827/api/Project/calling to get all task relate to particular projectID
            .map(res=>res)  //(response: Response) => <TaskInfo[]>response.json()
            .catch(this.handleError);
    }

    saveActivities(): void {
        const control = this.tsFormGroup.get('newActivityControl')['controls'];
        var i: number;
        for (i = 0; i < this.activityCount; i++) {
            var activityInfo = new ActivityModel();
            activityInfo.projectId = control[i].controls.projectId.value;
            activityInfo.taskId = control[i].controls.taskId.value;
            activityInfo.activityDate = control[i].controls.activityDate.value;
            activityInfo.noOfHoursSpent = control[i].controls.hoursSpent.value;
            activityInfo.comments = control[i].controls.comment.value;
            this.activityInfoList[i] = activityInfo;
        }
      //  this.saveActivity(this.activityInfoList)
        this._activityService.createActivities(this.activityInfoList)
            .subscribe(
            data => {
                Swal(
                    'Success!',
                    'Saved Successfully!',
                    'success'
                ).then()
              //  this.loading = false;
                this.getAllActivitiesByResource();
                this.ngOnInit();
            },
            error => {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
             //   this.loading = false;
            }
        );
        this.tsFormGroup.reset()
    }

    getAllActivitiesByResource() {
        this.loading = true;
        this._activityService.getAllActivitiesByResource().subscribe(
            data => {
                setTimeout(() => {
                    this.allActivites = data;
                    this.loading = false;
                })

              
            },
            error => {
                alert("Activities list is not loaded");
                this.loading = false;
            }
        );
    }
    downloadExcelFile() {
        // var url = "http://localhost:49827/api/ExportExcel/0";
        window.open(UrlHelper.apiEndpoint + UrlHelper.exportActivityByResource);
    }
    public removeItem(item: any) {
        Swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Project,Task and Activities!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this._activityService.deleteActivity(item.activityId).subscribe(
                    data => {
                        if (data) {
                            this.allActivites = _.filter(this.allActivites, (elem) => elem != item);
                            Swal(
                                'Deleted!',
                                'Activity has been deleted.',
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
                    'Your data is safe :)',
                    'error'
                )
            }
        })
    }

    private extractData(res: Response) {
        let sts = parseInt(res.text());
        if (res.ok && sts == 1) { alert('Changes Updated Successfully'); };

    }
    clearPage() {
    }
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TaskType, TaskList } from '../_models/tasks';

import { TaskService, ProjectService } from '../_services/index';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    //directives: [FORM_DIRECTIVES]
})
export class TaskComponent implements OnInit {
    public myForm: FormGroup;
    public options: any = [];
    constructor(private _fb: FormBuilder, private taskService: TaskService, private _projectService: ProjectService) {
        this.loadProjects();
       
      
    }
    ngOnInit() {
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
        /* subscribe to addresses value changes */
        // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
        //   console.log(x);
        // })
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

      //  console.log(JSON.stringify(model));
       // let task: Task[];
       // var reportPersonList: Task[] = new Array();

       // var people = this.myForm.get('addresses') as FormArray;

        //for (let i = 0; i < people.length; i++) {
        //    var p = new Task;
        //    p.Name = people.at(i).get('name').value;
            //p.firstName = people.at(i).get('firstName').value;
            //p.middleName = people.at(i).get('middleName').value;
            //var addresses = people.at(i).get('addresses') as FormArray;
            //for (let j = 0; j < addresses.length; j++) {
            //    var a = new PersonAddress;
            //    a.street = addresses.at(j).get('street').value;

            //    p.addresses.push(a);
            //};
          //  reportPersonList.push(p);
       // }
      //  var taskData = new TaskList;
       // taskData.TaskData = reportPersonList;
       // console.log(JSON.StaskData);
       // let requestData: TaskList;
        //const control = <FormArray>this.myForm.controls['tasktype'].value;
        //const taskName = <FormArray>this.myForm.controls['taskName'].value;
        //const terminals = <FormArray>this.myForm.value;
        //requestData.taskName = taskName;
       // console.log(terminals);
        this.taskService.createAllTasks(this.myForm.value).subscribe(data => {
            alert("success");
        },
            error => {
                // console.log(error['error']['error_description']);
                 alert(error);
                
            });;
        this.myForm.reset()
    }

}

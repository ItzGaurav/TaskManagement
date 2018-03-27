
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Task, TaskList } from '../_models/tasks';

import { TaskService } from '../_services/task.service';

@Component({
    selector: 'task',
    templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
    public myForm: FormGroup;

    constructor(private _fb: FormBuilder, private taskService: TaskService) { }
    ngOnInit() {
        this.myForm = this._fb.group({
            //name: ['', [Validators.required, Validators.minLength(5)]],
            addresses: this._fb.array([])
        });

        // add address
        this.addAddress();

        /* subscribe to addresses value changes */
        // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
        //   console.log(x);
        // })

    }
    initAddress() {
        return this._fb.group({
            name: ['', Validators.required],
            //postcode: ['', Validators.required]
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        const addrCtrl = this.initAddress();

        control.push(addrCtrl);

        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

    save(model: Task[]) {
       
   
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
        const control = <FormArray>this.myForm.controls['addresses'];
        let terminals = control.value;
        this.taskService.createAllTasks(terminals).subscribe(data => {
            alert("success");
        },
            error => {
                // console.log(error['error']['error_description']);
                 alert(error);
                
            });;
        this.myForm.reset()
    }

}

//import { Component, OnInit } from '@angular/core';

//@Component({
//    selector: 'app-exp',
//    templateUrl: './taskchild.component.html'
//})
//export class TaskChildComponent {
//    _ref: any;
//    lang: string;
//    exp: number;
//    constructor() { }

//    removeObject() {
//        this._ref.destroy();
//    }

//    save() {
//        if (this.lang && this.exp)
//            alert(`Language: ${this.lang} & Experience: ${this.exp}`);
//        else
//            alert('Please enter value to save');
//    }
//}
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'taskForm',
    templateUrl: './taskchild.component.html',
})
export class TaskChildComponent {
    @Input('group')
    public adressForm: FormGroup;
}

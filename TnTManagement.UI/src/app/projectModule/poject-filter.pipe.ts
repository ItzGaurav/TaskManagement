import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataPipeFilter implements PipeTransform {
    response: any[];
    transform(array: any[], query: string): any {
        
        if (query) {
            this.response = _.filter(array, row => row.projectName.toLowerCase().indexOf(query) > -1);
            //if (this.response == null)
            //{
            //    this.response =  _.filter(array, row => row.epicId.toLowerCase().indexOf(query) > -1);
            //}
            //if (this.response == null) {
            //    this.response = _.filter(array, row => row.ccNumber.toLowerCase().indexOf(query) > -1);
            //}
            return this.response;
        }
        return array;
    }
}
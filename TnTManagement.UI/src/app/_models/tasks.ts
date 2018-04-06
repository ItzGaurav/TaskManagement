import { Resource } from './resource'

export class TaskType {
    public taskType: string;
    public plannedHours: number;
    public resource: Resource;
}
//export class Resource {
//    public id: number;
//    public name: string;
//}
export class TaskList {

    public projectId?: number;
    public taskName?: string;
    public plannedStartDate?: string;
    public plannedEndDate?: string;
    public description?: string;   
    public tasktype?: TaskType[];
}
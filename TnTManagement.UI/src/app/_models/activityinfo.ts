export class ActivityInfo {
    public ResourceId: number = 0;
    public ResourceName: string = '';
    public ActivityId: number = 0;
    public ProjectId: number = 0;
    public ProjectName: string = '';
    public TaskId: number = 0;
    public TaskType: string = '';
    public ActivityDate: Date = new Date();
    public NoOfHoursSpent: number = 0;
    public LastModifiedBy: number = 0;
    public LastModifiedName: string = '';

}
export class ActivityModel {
    public activityId: number = 0;
    public projectId: number = 0;
    public taskId: number = 0;
    public resourceId: number = 0;
    public activityDate: Date = new Date();
    public noOfHoursSpent: number = 0;
    public comments: string = '';
}
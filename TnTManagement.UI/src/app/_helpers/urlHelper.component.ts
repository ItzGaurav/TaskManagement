export class UrlHelper {
    public static apiEndpoint = 'http://localhost:62822/';

    public static loginUrl = 'oauth/token';

    public static tokenValidUrl = 'api/user/tokenvalid';
    public static userCreateUrl = 'api/user/create';
    public static changePasswordUrl = 'api/user/changePassword';
    public static getAllUserUrl = 'api/user/users';
    public static getResourceUrl = 'api/user/getresources';
    public static deleteUser = 'api/user/delete?userId=';


    public static createProject = 'api/project/create';
    public static updateProject = 'api/project/update';
    public static deleteProject = 'api/project/deleteproject?projectId=';
    public static getAllProjects = 'api/project/getProjects';
    public static getAllProjectList = 'api/project/getAllProjects';


    public static createTasks = 'api/tasks/createAll';
    public static getTaskbyProject = 'api/tasks/getTaskDropdown?';
    public static getAllTaskByresource = 'api/tasks/getallByResource';
    public static deleteTask = 'api/tasks/deleteTask?taskId=';

    public static createActivities = 'api/activity/createAll';
    public static getAllActivitiesByResource = 'api/activity/getAllActivity';
    public static deleteActivity = 'api/activity/deleteActivity?activityId=';
    public static exportActivityByResource = 'api/activity/exportMyReport';

    public static acivityReportOfUser = 'api/report/activityReportByUser?'
}
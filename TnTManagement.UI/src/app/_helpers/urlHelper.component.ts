export class UrlHelper {
    public static apiEndpoint = 'http://localhost:62822/';

    public static loginUrl = 'oauth/token';

    public static tokenValidUrl = 'api/user/tokenvalid';
    public static userCreateUrl = 'api/user/create';
    public static getAllUserUrl = 'api/user/users';
    public static getResourceUrl = 'api/user/getresources';

    public static createTasks = 'api/tasks/createAll';
    public static createProject = 'api/project/create';
    public static getAllProjects = 'api/project/getProjects';
    public static getAllProjectList = 'api/project/getAllProjects';
}
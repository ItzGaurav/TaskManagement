export class User {
    constructor(
        public Id: number,
        public Email: string,
        public UserName: string,
        public Password: string,
        public ConfirmPassword: string,
        public FirstName: string,
        public LastName: string,
    ) {

    }

}
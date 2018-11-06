export class User {
    public _id: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public primaryPhone: string;
    public password: string;
    constructor() {
        this._id = '';
        this.userName = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.primaryPhone = '';
        this.password = '';
    }
}

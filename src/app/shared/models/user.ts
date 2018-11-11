export class User {
    public id: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public primaryPhone: string;
    public password: string;
    public share: number;
    public lent: number;
    public owe: number;
    public displayImage: string;

    constructor() {
        this.id = '';
        this.userName = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.primaryPhone = '';
        this.password = '';
        this.lent = this.share = this.owe = 0;
        this.displayImage = '';
    }
}

export class UserSplit {
    public userId: string; // foreign key
    public lent: number;
    public share: number;
    public owe: number;
    constructor(_userId: string) {
        this.userId = _userId;
        this.lent = this.share = this.owe = 0;
    }
}

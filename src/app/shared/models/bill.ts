
import { User } from './user';

export class Bill {
    public id: string;
    public users: Array<User>;
    public lenters: Array<User>;
    public description: string;
    public billImage?: File;
    public groupId: string;
    public expense: number;
    public isSettled: boolean;

    constructor() {
        this.isSettled = false;
    }
}


import { User } from './user';
import { SubCategory } from './sub-category';

export class Bill {
    public id: string;
    public users: Array<string>;
    public lenter: User;
    public description: string;
    public billImage?: File;
    public groupId: string;
    public expense: number;
    public isSettled: boolean;
    public createdDate: Date;
    public cateogry: SubCategory;

    constructor() {
        this.isSettled = false;
        this.users = [];
    }
}

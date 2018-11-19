
import { User } from './user';
import { SubCategory } from './sub-category';
import { UserSplit } from './user-split';

export class Bill {
    public id: string;
    public users: Array<string>;
    public lenter: string;
    public description: string;
    public billImage?: File;
    public groupId: string;
    public expense: number;
    public isSettled: boolean;
    public createdDate: Date;
    public cateogry: SubCategory;
    public userSplits: Array<UserSplit>;

    constructor() {
        this.isSettled = false;
        this.users = [];
    }
}

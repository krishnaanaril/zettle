import { User } from './user';

export class Group {
    public id: string;
    public name: string;
    public description: string;
    public users: Array<User>;
    public sum: number;

    constructor() { }
}

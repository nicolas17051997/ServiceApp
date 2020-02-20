import {Role} from './role';
export class User {
    id?: number;
    userName : string;
    userSurname : string;
    userEmail  : string;
    userPassword: string;
    //role: Role;
    token?: string;
    
}
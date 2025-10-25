import { Entity } from "./entity.interface";

export interface IUser extends Entity<{
    email: string;
    username: string;
    password: string;
    role?: USER_ROLE
}> { }

export enum USER_ROLE {
    ADMIN = "ADMIN",
    USER = "USER",
}
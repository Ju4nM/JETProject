import User from "./user.interface";

export interface UpdateUser extends User {
    passwordRepeated: string;
}
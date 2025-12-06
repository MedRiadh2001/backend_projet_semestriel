import { IIdentifiable } from "src/shared/types/interfaces/IIdentifiable.interface";
import { IUser } from "src/shared/types/interfaces/IUser.interface";
import { RolesEnum } from "../enums/role.enum";

export interface IStaff extends IIdentifiable, IUser {
    role: RolesEnum,
    password: string,
}
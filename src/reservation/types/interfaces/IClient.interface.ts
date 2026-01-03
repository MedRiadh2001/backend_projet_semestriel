import { IIdentifiable } from "../../../shared/types/interfaces/IIdentifiable.interface";
import { IUser } from "../../../shared/types/interfaces/IUser.interface";

export interface IClient extends IIdentifiable, IUser {
    address: string;
}
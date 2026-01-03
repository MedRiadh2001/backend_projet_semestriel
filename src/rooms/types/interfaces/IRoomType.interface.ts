import { IIdentifiable } from "../../../shared/types/interfaces/IIdentifiable.interface";

export interface IRoomType extends IIdentifiable {
    name: string;
    description: string;
    capacity: number;
    pricePerNight: number;
}
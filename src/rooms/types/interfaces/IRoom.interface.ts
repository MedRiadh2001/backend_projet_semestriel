import { IIdentifiable } from "../../../shared/types/interfaces/IIdentifiable.interface";
import { RoomStatusEnum } from "../enums/RoomStatus.enum";
import { IRoomType } from "./IRoomType.interface";

export interface IRoom extends IIdentifiable {
    number: string;
    floor: number;
    roomType: IRoomType;
    status: RoomStatusEnum;
}
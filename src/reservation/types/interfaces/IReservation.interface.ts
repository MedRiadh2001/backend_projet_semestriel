import { Room } from "../../../rooms/entities/Room.entity";
import { IRoom } from "../../../rooms/types/interfaces/IRoom.interface";
import { IIdentifiable } from "../../../shared/types/interfaces/IIdentifiable.interface";
import { Client } from "../../entities/Client.entity";
import { ReservationStatusEnum } from "../enums/ReservationStatus.enum";
import { IClient } from "./IClient.interface";

export interface IReservation extends IIdentifiable {
    startDate: Date;
    endDate: Date;
    status: ReservationStatusEnum;
    client: IClient | Client;
    room: IRoom | Room;
}
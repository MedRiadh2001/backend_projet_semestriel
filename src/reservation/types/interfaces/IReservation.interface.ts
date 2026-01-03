import { IIdentifiable } from "../../../shared/types/interfaces/IIdentifiable.interface";
import { ReservationStatusEnum } from "../enums/ReservationStatus.enum";

export interface IReservation extends IIdentifiable {
    startDate: Date;
    endDate: Date;
    status: ReservationStatusEnum;
}
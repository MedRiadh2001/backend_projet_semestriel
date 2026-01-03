import { Reservation } from "../../../reservation/entities/Reservation.entity";
import { IReservation } from "../../../reservation/types/interfaces/IReservation.interface";
import { IIdentifiable } from "../../../shared/types/interfaces/IIdentifiable.interface";
import { PaymentTypeEnum } from "../enums/PaymentTypeEnum.enum";

export interface IFacture extends IIdentifiable{
    issueDate: Date;
    totalAmount: number;
    paymentType: PaymentTypeEnum;
    reservation: IReservation | Reservation;
}
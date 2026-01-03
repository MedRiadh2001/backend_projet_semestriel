import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Reservation } from "../../reservation/entities/Reservation.entity";
import { IReservation } from "../../reservation/types/interfaces/IReservation.interface";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentTypeEnum } from "../types/enums/PaymentTypeEnum.enum";
import { IFacture } from "../types/interfaces/IFacture.interface";

@Entity()
export class Facture implements IFacture {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty({ type: Date })
    issueDate: Date;

    @Column('decimal')
    @ApiProperty()
    totalAmount: number;

    @Column({ type: 'enum', enum: PaymentTypeEnum })
    @ApiProperty({ enum: PaymentTypeEnum })
    paymentType: PaymentTypeEnum;

    @OneToOne(() => Reservation)
    @JoinColumn()
    @ApiProperty({ type: () => Reservation })
    reservation: IReservation | Reservation;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
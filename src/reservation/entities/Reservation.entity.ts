import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IReservation } from "../types/interfaces/IReservation.interface";
import { ReservationStatusEnum } from "../types/enums/ReservationStatus.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "../../rooms/entities/Room.entity";
import { Client } from "./Client.entity";
import { IRoom } from "../../rooms/types/interfaces/IRoom.interface";
import { IClient } from "../types/interfaces/IClient.interface";

@Entity()
export class Reservation implements IReservation {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    startDate: Date;

    @Column()
    @ApiProperty()
    endDate: Date;

    @Column({ type: "enum", enum: ReservationStatusEnum, nullable: true, default: ReservationStatusEnum.PENDING, enumName: 'reservation_status_enum' })
    @ApiProperty({ enum: ReservationStatusEnum })
    status: ReservationStatusEnum;

    @ManyToOne(() => Room, { eager: false })
    @ApiProperty()
    room: IRoom | Room;

    @ManyToOne(() => Client, { eager: false })
    @ApiProperty()
    client: IClient | Client;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

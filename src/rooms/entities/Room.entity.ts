import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoomStatusEnum } from "../types/enums/RoomStatus.enum";
import { IRoom } from "../types/interfaces/IRoom.interface";
import { RoomType } from "./RoomType.entity";
import { IRoomType } from "../types/interfaces/IRoomType.interface";

@Entity()
export class Room implements IRoom {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    number: string;

    @Column()
    @ApiProperty()
    floor: number;

    @ManyToOne(() => RoomType)
    roomType: IRoomType | RoomType;

    @Column({ type: "enum", enum: RoomStatusEnum, nullable: true, enumName: 'room_status_enum', default: RoomStatusEnum.AVAILABLE })
    @ApiProperty({ enum: RoomStatusEnum })
    status: RoomStatusEnum;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
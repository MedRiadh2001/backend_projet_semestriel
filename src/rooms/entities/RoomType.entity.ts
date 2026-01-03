import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IRoomType } from "../types/interfaces/IRoomType.interface";

@Entity()
export class RoomType implements IRoomType {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    capacity: number;

    @Column("decimal")
    @ApiProperty()
    pricePerNight: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
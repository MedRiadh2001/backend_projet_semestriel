import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IClient } from "../types/interfaces/IClient.interface";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Client implements IClient {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    firstName: string;

    @Column()
    @ApiProperty()
    lastName: string;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    phone: string;

    @Column()
    @ApiProperty()
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

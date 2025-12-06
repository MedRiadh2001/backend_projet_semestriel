import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IStaff } from "../types/interfaces/IStaff.interface";
import { RolesEnum } from "../types/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Staff implements IStaff {
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

    @Column({ type: "enum", enum: RolesEnum, nullable: true, enumName: 'roles_enum' })
    @ApiProperty({ enum: RolesEnum })
    role: RolesEnum;

    @Column()
    @ApiProperty()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
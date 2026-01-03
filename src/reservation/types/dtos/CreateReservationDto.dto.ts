import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { ReservationStatusEnum } from "../enums/ReservationStatus.enum";

export class CreateReservationDto {

    @ApiProperty({ example: '2026-01-10' })
    @IsDateString()
    startDate: Date;

    @ApiProperty({ example: '2026-01-15' })
    @IsDateString()
    endDate: Date;

    @ApiProperty({ enum: ReservationStatusEnum })
    @IsEnum(ReservationStatusEnum)
    status: ReservationStatusEnum;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    roomId: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    clientId: string;
}

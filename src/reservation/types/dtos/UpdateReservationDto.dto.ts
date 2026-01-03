import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { ReservationStatusEnum } from "../enums/ReservationStatus.enum";

export class UpdateReservationDto {

    @ApiPropertyOptional({ example: '2026-01-12' })
    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @ApiPropertyOptional({ example: '2026-01-18' })
    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @ApiPropertyOptional({ enum: ReservationStatusEnum })
    @IsOptional()
    @IsEnum(ReservationStatusEnum)
    status?: ReservationStatusEnum;
}

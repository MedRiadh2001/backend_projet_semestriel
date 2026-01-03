import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { ReservationStatusEnum } from "../enums/ReservationStatus.enum";
import { Type } from "class-transformer";
import { CreateClientDto } from "./CreateClientDto.dto";

export class CreateReservationDto {

    @ApiProperty({ example: '2026-01-10' })
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty({ example: '2026-01-15' })
    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @ApiProperty({ enum: ReservationStatusEnum })
    @IsEnum(ReservationStatusEnum)
    status: ReservationStatusEnum;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    roomId: string;

    // @ApiProperty()
    // @IsUUID()
    // @IsNotEmpty()
    // clientId: string;

    @IsOptional()
    @ApiPropertyOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateClientDto)
    createClientDto?: CreateClientDto;
}

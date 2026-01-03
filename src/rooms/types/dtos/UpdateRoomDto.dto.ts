import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { RoomStatusEnum } from '../enums/RoomStatus.enum';

export class UpdateRoomDto {
    @ApiPropertyOptional({ example: '202' })
    @IsOptional()
    number?: string;

    @ApiPropertyOptional({ example: 2 })
    @IsOptional()
    floor?: number;

    @ApiPropertyOptional({ example: 'uuid-room-type' })
    @IsUUID()
    @IsOptional()
    roomTypeId?: string;

    @ApiPropertyOptional({ enum: RoomStatusEnum })
    @IsEnum(RoomStatusEnum)
    @IsOptional()
    status?: RoomStatusEnum;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { RoomStatusEnum } from '../enums/RoomStatus.enum';

export class CreateRoomDto {
    @ApiProperty({ example: '101' })
    @IsNotEmpty({ message: 'Room number is required' })
    number: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    floor: number;

    @ApiProperty({ example: 'uuid-room-type' })
    @IsUUID()
    roomTypeId: string;

    @ApiProperty({ enum: RoomStatusEnum, required: false })
    @IsEnum(RoomStatusEnum)
    @IsOptional()
    status?: RoomStatusEnum;
}

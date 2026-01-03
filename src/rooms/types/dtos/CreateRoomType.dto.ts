import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRoomTypeDto {
    @ApiProperty({ example: 'Double' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: 'Double room with sea view' })
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @ApiProperty({ example: 2 })
    @IsNumber()
    @Min(1, { message: 'Capacity must be at least 1' })
    capacity: number;

    @ApiProperty({ example: 120 })
    @IsNumber()
    @Min(0, { message: 'Price must be positive' })
    pricePerNight: number;
}

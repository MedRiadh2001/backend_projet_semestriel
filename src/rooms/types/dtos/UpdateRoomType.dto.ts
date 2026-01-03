import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateRoomTypeDto {
    @ApiPropertyOptional({ example: 'Suite' })
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'Luxury suite' })
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 4 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    capacity?: number;

    @ApiPropertyOptional({ example: 250 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    pricePerNight?: number;
}

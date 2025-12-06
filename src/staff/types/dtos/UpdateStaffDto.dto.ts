import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RolesEnum } from '../enums/role.enum';

export class UpdateStaffDto {
    @ApiPropertyOptional({ example: 'John' })
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({ example: 'Doe' })
    @IsOptional()
    lastName?: string;

    @ApiPropertyOptional({ example: 'john.doe@example.com' })
    @IsEmail({}, { message: 'Email must be valid' })
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: '+1234567890' })
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ enum: RolesEnum })
    @IsEnum(RolesEnum)
    @IsOptional()
    role?: RolesEnum;
}

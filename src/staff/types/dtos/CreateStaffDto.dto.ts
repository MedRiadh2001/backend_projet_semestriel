import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../enums/role.enum';

export class CreateStaffDto {
    @ApiProperty({ example: 'Ali' })
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @ApiProperty({ example: 'Ben Saleh' })
    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @ApiProperty({ example: 'ali.bensaleh@example.com' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string;

    @ApiProperty({ example: '+216 12 345 678' })
    @IsNotEmpty({ message: 'Phone number is required' })
    phone: string;

    @ApiProperty({ enum: RolesEnum })
    @IsEnum(RolesEnum, { message: 'Role must be a valid value' })
    role: RolesEnum;

    @ApiProperty({ example: 'Password123!' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateClientDto {

    @ApiProperty({ example: 'Ali' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'Ben Salah' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'ali@mail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '+21612345678' })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: 'Tunis, Tunisia' })
    @IsNotEmpty()
    address: string;
}
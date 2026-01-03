import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ResetPasswordAdminDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'New password is required' })
    newPassword: string;
}
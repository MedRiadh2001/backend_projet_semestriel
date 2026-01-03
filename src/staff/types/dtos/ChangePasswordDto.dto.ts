import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Old password is required' })
    oldPassword: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'New password is required' })
    newPassword: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Confirm new password is required' })
    confirmNewPassword: string;
}
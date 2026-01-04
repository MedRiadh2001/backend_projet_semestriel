import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { PaymentTypeEnum } from '../enums/PaymentTypeEnum.enum';

export class CreateFactureDto {

    @ApiProperty({ enum: PaymentTypeEnum })
    @IsEnum(PaymentTypeEnum)
    @IsNotEmpty()
    paymentType: PaymentTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    reservationId: string;
}

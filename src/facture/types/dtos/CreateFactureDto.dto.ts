import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { PaymentTypeEnum } from '../enums/PaymentTypeEnum.enum';

export class CreateFactureDto {
    @ApiProperty({ type: Date })
    @IsNotEmpty()
    issueDate: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalAmount: number;

    @ApiProperty({ enum: PaymentTypeEnum })
    @IsEnum(PaymentTypeEnum)
    @IsNotEmpty()
    paymentType: PaymentTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    reservationId: string;
}

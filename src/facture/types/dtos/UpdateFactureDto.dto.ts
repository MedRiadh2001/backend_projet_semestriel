import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsNumber } from 'class-validator';
import { PaymentTypeEnum } from '../enums/PaymentTypeEnum.enum';

export class UpdateFactureDto {

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    totalAmount?: number;

    @ApiPropertyOptional({ enum: PaymentTypeEnum })
    @IsEnum(PaymentTypeEnum)
    @IsOptional()
    paymentType?: PaymentTypeEnum;
}

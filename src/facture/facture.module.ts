import { Module } from '@nestjs/common';
import { FactureService } from './facture.service';
import { FactureController } from './facture.controller';
import { FactureRepository } from './repository/Facture.repository';
import { ReservationModule } from '../reservation/reservation.module';
import { FacturePdfService } from './facture-pdf.service';

@Module({
  imports: [ReservationModule],
  providers: [FactureService, FactureRepository, FacturePdfService],
  controllers: [FactureController]
})
export class FactureModule {}

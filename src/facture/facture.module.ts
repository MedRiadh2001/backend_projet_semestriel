import { Module } from '@nestjs/common';
import { FactureService } from './facture.service';
import { FactureController } from './facture.controller';
import { FactureRepository } from './repository/Facture.repository';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [ReservationModule],
  providers: [FactureService, FactureRepository],
  controllers: [FactureController]
})
export class FactureModule {}

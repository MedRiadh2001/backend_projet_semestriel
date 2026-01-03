import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { ReservationRepository } from './repository/Reservation.repository';
import { ClientRepository } from './repository/Client.repository';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PdfService } from './pdfService.service';

@Module({
  imports: [RoomsModule],
  providers: [ReservationService, ReservationRepository, ClientRepository, ClientService, PdfService],
  controllers: [ReservationController, ClientController],
  exports: [ReservationRepository]
})
export class ReservationModule {}

import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { ReservationRepository } from './repository/Reservation.repository';
import { ClientRepository } from './repository/Client.repository';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [RoomsModule],
  providers: [ReservationService, ReservationRepository, ClientRepository, ClientService],
  controllers: [ReservationController, ClientController]
})
export class ReservationModule {}

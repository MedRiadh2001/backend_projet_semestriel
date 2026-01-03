import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { ReservationRepository } from './repository/Reservation.repository';
import { ClientRepository } from './repository/Client.repository';

@Module({
  imports: [RoomsModule],
  providers: [ReservationService, ReservationRepository, ClientRepository],
  controllers: [ReservationController]
})
export class ReservationModule {}

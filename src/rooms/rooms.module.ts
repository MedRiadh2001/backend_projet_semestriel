import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomRepository } from './repository/Room.repository';
import { RoomTypeRepository } from './repository/RoomType.repository';
import { RoomTypeService } from './roomType.service';
import { RoomTypeController } from './roomType.controller';

@Module({
  providers: [RoomsService, RoomTypeService, RoomRepository, RoomTypeRepository],
  controllers: [RoomsController, RoomTypeController],
  exports: [RoomRepository],
})
export class RoomsModule {}

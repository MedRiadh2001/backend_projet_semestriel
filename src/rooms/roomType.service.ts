import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomTypeRepository } from './repository/RoomType.repository';
import { CreateRoomTypeDto } from './types/dtos/CreateRoomType.dto';
import { UpdateRoomTypeDto } from './types/dtos/UpdateRoomType.dto';

@Injectable()
export class RoomTypeService {
    constructor(
        private readonly roomTypeRepository: RoomTypeRepository,
    ) { }

    findAll() {
        return this.roomTypeRepository.find();
    }

    async findById(id: string) {
        const roomType = await this.roomTypeRepository.findOne({ where: { id } });
        if (!roomType) throw new NotFoundException('Room type not found');
        return roomType;
    }

    create(dto: CreateRoomTypeDto) {
        const roomType = this.roomTypeRepository.create(dto);
        return this.roomTypeRepository.save(roomType);
    }

    async update(id: string, dto: UpdateRoomTypeDto) {
        const roomType = await this.findById(id);
        Object.assign(roomType, dto);
        return this.roomTypeRepository.save(roomType);
    }

    async delete(id: string) {
        const roomType = await this.findById(id);
        await this.roomTypeRepository.remove(roomType);
        return { deleted: true };
    }
}

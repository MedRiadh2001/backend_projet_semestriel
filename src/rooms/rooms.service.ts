import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomStatusEnum } from './types/enums/RoomStatus.enum';
import { RoomRepository } from './repository/Room.repository';
import { RoomTypeRepository } from './repository/RoomType.repository';
import { CreateRoomDto } from './types/dtos/CreateRoomDto.dto';
import { UpdateRoomDto } from './types/dtos/UpdateRoomDto.dto';

@Injectable()
export class RoomsService {
    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly roomTypeRepository: RoomTypeRepository,
    ) { }

    findAll() {
        return this.roomRepository.find({ relations: ['roomType'] });
    }

    async findById(id: string) {
        const room = await this.roomRepository.findOne({
            where: { id },
            relations: ['roomType'],
        });
        if (!room) throw new NotFoundException('Room not found');
        return room;
    }

    async create(dto: CreateRoomDto) {
        const roomType = await this.roomTypeRepository.findOne({
            where: { id: dto.roomTypeId },
        });

        if (!roomType) throw new NotFoundException('Room type not found');

        const room = this.roomRepository.create({
            number: dto.number,
            floor: dto.floor,
            status: dto.status,
            roomType,
        });

        return this.roomRepository.save(room);
    }

    async update(id: string, dto: UpdateRoomDto) {
        const room = await this.findById(id);

        if (dto.roomTypeId) {
            const roomType = await this.roomTypeRepository.findOne({
                where: { id: dto.roomTypeId },
            });
            if (!roomType) throw new NotFoundException('Room type not found');
            room.roomType = roomType;
        }

        Object.assign(room, dto);
        return this.roomRepository.save(room);
    }

    findAvailableRooms(roomTypeId?: string) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .leftJoin('room.roomType', 'roomType')
            .where('room.status = :status', { status: RoomStatusEnum.AVAILABLE });

        if (roomTypeId) {
            query.andWhere('roomType.id = :roomTypeId', { roomTypeId });
        }

        return query.getMany();
    }

    async delete(id: string) {
        const room = await this.findById(id);
        await this.roomRepository.remove(room);
        return { deleted: true };
    }
}

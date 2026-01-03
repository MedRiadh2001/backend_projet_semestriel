import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReservationRepository } from './repository/Reservation.repository';
import { RoomRepository } from '../rooms/repository/Room.repository';
import { ClientRepository } from './repository/Client.repository';
import { UpdateReservationDto } from './types/dtos/UpdateReservationDto.dto';
import { RoomStatusEnum } from '../rooms/types/enums/RoomStatus.enum';
import { CreateReservationDto } from './types/dtos/CreateReservationDto.dto';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly roomRepository: RoomRepository,
        private readonly clientRepository: ClientRepository,
    ) { }

    async getAllReservations() {
        return this.reservationRepository.find();
    }

    async getReservationById(id: string) {
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        if (!reservation) {
            throw new NotFoundException(`Reservation with id ${id} not found`);
        }
        return reservation;
    }

    async createReservation(dto: CreateReservationDto) {
        const room = await this.roomRepository.findOne({ where: { id: dto.roomId } });
        if (!room) throw new NotFoundException('Room not found');

        if (room.status !== RoomStatusEnum.AVAILABLE) {
            throw new BadRequestException('Room is not available');
        }

        const client = await this.clientRepository.findOne({ where: { id: dto.clientId } });
        if (!client) throw new NotFoundException('Client not found');

        const reservation = this.reservationRepository.create({
            startDate: dto.startDate,
            endDate: dto.endDate,
            status: dto.status,
            room,
            client
        });

        room.status = RoomStatusEnum.BOOKED;
        await this.roomRepository.save(room);

        return this.reservationRepository.save(reservation);
    }

    async updateReservation(id: string, dto: UpdateReservationDto) {
        const reservation = await this.getReservationById(id);

        if (dto.startDate) reservation.startDate = dto.startDate;
        if (dto.endDate) reservation.endDate = dto.endDate;
        if (dto.status) reservation.status = dto.status;

        return this.reservationRepository.save(reservation);
    }

    async deleteReservation(id: string) {
        const reservation = await this.getReservationById(id);
        await this.reservationRepository.delete(reservation.id);
        return { deleted: true };
    }
}

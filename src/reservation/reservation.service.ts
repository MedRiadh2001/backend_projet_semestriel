import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReservationRepository } from './repository/Reservation.repository';
import { RoomRepository } from '../rooms/repository/Room.repository';
import { ClientRepository } from './repository/Client.repository';
import { UpdateReservationDto } from './types/dtos/UpdateReservationDto.dto';
import { CreateReservationDto } from './types/dtos/CreateReservationDto.dto';
import { ClientService } from './client.service';
import { ReservationStatusEnum } from './types/enums/ReservationStatus.enum';
import { IClient } from './types/interfaces/IClient.interface';
import { PdfService } from './pdfService.service';
import * as path from 'path';
import * as os from 'os';
import { RoomStatusEnum } from '../rooms/types/enums/RoomStatus.enum';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly roomRepository: RoomRepository,
        private readonly clientRepository: ClientRepository,
        private readonly clientService: ClientService,
        private readonly pdfService: PdfService,
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

        const room = await this.roomRepository.findOne({
            where: { id: dto.roomId },
        });

        if (!room) {
            throw new NotFoundException('Room not found');
        }

        const conflict = await this.reservationRepository
            .createQueryBuilder('r')
            .where('r.roomId = :roomId', { roomId: room.id })
            .andWhere(
                '(r.startDate < :endDate AND r.endDate > :startDate)',
                {
                    startDate: dto.startDate,
                    endDate: dto.endDate,
                },
            )
            .andWhere('r.status IN (:...statuses)', {
                statuses: [
                    ReservationStatusEnum.PENDING,
                    ReservationStatusEnum.CONFIRMED,
                ],
            })
            .getOne();

        if (conflict) {
            throw new BadRequestException(
                'Room already reserved for this period',
            );
        }

        let client: IClient | null = null;
        if (dto.createClientDto?.email) {
            client = await this.clientRepository.findOne({
                where: { email: dto.createClientDto.email },
            });
        }

        if (!client) {
            if (!dto.createClientDto) {
                throw new BadRequestException('Client data is required to create a new client');
            }
            client = this.clientRepository.create(dto.createClientDto);
            client = await this.clientRepository.save(client);
        }

        const reservation = this.reservationRepository.create({
            startDate: dto.startDate,
            endDate: dto.endDate,
            room,
            client,
        });

        const savedReservation = await this.reservationRepository.save(reservation);

        if (reservation.room) {
            reservation.room.status = RoomStatusEnum.WAITING_FOR_CONFIRMATION;
            await this.roomRepository.save(reservation.room);
        }

        const fullReservation = await this.reservationRepository.findOne({
            where: { id: savedReservation.id },
            relations: ['client', 'room', 'room.roomType'],
        });

        if (!fullReservation) {
            throw new NotFoundException('Reservation not found after saving');
        }

        const downloadsPath = path.join(os.homedir(), 'Downloads'); // chemin vers Downloads
        const outputPath = path.join(downloadsPath, `reservation-${fullReservation.id}.pdf`);

        await this.pdfService.generateReservationPdf(fullReservation, outputPath);

        return fullReservation;
    }

    async confirmReservation(id: string) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['room'],
        });

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        if (reservation.status !== ReservationStatusEnum.PENDING) {
            throw new BadRequestException(
                'Only pending reservations can be confirmed',
            );
        }

        reservation.status = ReservationStatusEnum.CONFIRMED;

        if (reservation.room) {
            reservation.room.status = RoomStatusEnum.BOOKED;
            await this.roomRepository.save(reservation.room);
        }

        return this.reservationRepository.save(reservation);
    }

    async cancelReservation(id: string) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['room'],
        });

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        if (
            reservation.status === ReservationStatusEnum.CANCELLED ||
            reservation.status === ReservationStatusEnum.COMPLETED
        ) {
            throw new BadRequestException(
                'Reservation cannot be cancelled',
            );
        }

        reservation.status = ReservationStatusEnum.CANCELLED;

        if (reservation.room) {
            reservation.room.status = RoomStatusEnum.AVAILABLE;
            await this.roomRepository.save(reservation.room);
        }

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

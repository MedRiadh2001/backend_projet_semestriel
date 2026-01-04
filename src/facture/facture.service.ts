import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FactureRepository } from './repository/Facture.repository';
import { ReservationRepository } from '../reservation/repository/Reservation.repository';
import { CreateFactureDto } from './types/dtos/CreateFactureDto.dto';
import { UpdateFactureDto } from './types/dtos/UpdateFactureDto.dto';
import { FacturePdfService } from './facture-pdf.service';

@Injectable()
export class FactureService {
    constructor(
        private readonly factureRepository: FactureRepository,
        private readonly reservationRepository: ReservationRepository,
        private readonly facturePdfService: FacturePdfService,
    ) { }

    async getAllFactures() {
        return this.factureRepository.find({ relations: ['reservation', 'reservation.client', 'reservation.room', 'reservation.room.roomType'] });
    }

    async getFactureById(id: string) {
        const facture = await this.factureRepository.findOne({ where: { id }, relations: ['reservation'] });
        if (!facture) throw new NotFoundException('Facture not found');
        return facture;
    }

    async createFacture(dto: CreateFactureDto) {
        const reservation = await this.reservationRepository.findOne({
            where: { id: dto.reservationId },
            relations: [
                'room',
                'room.roomType',
                'client',
            ],
        });
        if (!reservation) throw new NotFoundException('Reservation not found');

        const existingInvoice = await this.factureRepository.findOne({
            where: { reservation: { id: dto.reservationId } },
        });

        if (existingInvoice) {
            throw new BadRequestException('Cette réservation a déjà une facture');
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        const diffTime = end.getTime() - start.getTime();
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const totalAmount = nights * Number(reservation.room.roomType.pricePerNight);

        const facture = this.factureRepository.create({
            issueDate: new Date(),
            totalAmount,
            paymentType: dto.paymentType,
            reservation
        });

        const savedFacture = await this.factureRepository.save(facture);

        await this.facturePdfService.generateFacturePdf({
            ...savedFacture,
            reservation,
        });

        return savedFacture;
    }

    async updateFacture(id: string, dto: UpdateFactureDto) {
        const facture = await this.getFactureById(id);

        if (dto.totalAmount !== undefined) facture.totalAmount = dto.totalAmount;
        if (dto.paymentType) facture.paymentType = dto.paymentType;

        return this.factureRepository.save(facture);
    }

    async deleteFacture(id: string) {
        const facture = await this.getFactureById(id);
        await this.factureRepository.delete(facture.id);
        return { deleted: true };
    }
}

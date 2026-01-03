import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FactureRepository } from './repository/Facture.repository';
import { ReservationRepository } from '../reservation/repository/Reservation.repository';
import { CreateFactureDto } from './types/dtos/CreateFactureDto.dto';
import { UpdateFactureDto } from './types/dtos/UpdateFactureDto.dto';

@Injectable()
export class FactureService {
    constructor(
        private readonly factureRepository: FactureRepository,
        private readonly reservationRepository: ReservationRepository
    ) { }

    async getAllFactures() {
        return this.factureRepository.find({ relations: ['reservation'] });
    }

    async getFactureById(id: string) {
        const facture = await this.factureRepository.findOne({ where: { id }, relations: ['reservation'] });
        if (!facture) throw new NotFoundException('Facture not found');
        return facture;
    }

    async createFacture(dto: CreateFactureDto) {
        const reservation = await this.reservationRepository.findOne({ where: { id: dto.reservationId } });
        if (!reservation) throw new NotFoundException('Reservation not found');

        const existingInvoice = await this.factureRepository.findOne({
            where: { reservation: { id: dto.reservationId } },
        });

        if (existingInvoice) {
            throw new BadRequestException('Cette réservation a déjà une facture');
        }

        const facture = this.factureRepository.create({
            issueDate: dto.issueDate,
            totalAmount: dto.totalAmount,
            paymentType: dto.paymentType,
            reservation
        });

        return this.factureRepository.save(facture);
    }

    async updateFacture(id: string, dto: UpdateFactureDto) {
        const facture = await this.getFactureById(id);

        if (dto.issueDate) facture.issueDate = dto.issueDate;
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

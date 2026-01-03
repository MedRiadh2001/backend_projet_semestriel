import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './types/dtos/CreateReservationDto.dto';
import { UpdateReservationDto } from './types/dtos/UpdateReservationDto.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/RoleGuard.guard';
import { Roles } from '../shared/decorators/RoleDecorator.decorator';
import { RolesEnum } from '../staff/types/enums/role.enum';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @Get()
    getAll() {
        return this.reservationService.getAllReservations();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.reservationService.getReservationById(id);
    }

    @Post()
    create(@Body() dto: CreateReservationDto) {
        return this.reservationService.createReservation(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateReservationDto
    ) {
        return this.reservationService.updateReservation(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @Patch(':id/confirm')
    confirm(@Param('id') id: string) {
        return this.reservationService.confirmReservation(id);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @Patch(':id/cancel')
    cancel(@Param('id') id: string) {
        return this.reservationService.cancelReservation(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.reservationService.deleteReservation(id);
    }
}
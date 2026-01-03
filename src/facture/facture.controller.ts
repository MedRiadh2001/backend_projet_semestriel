import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FactureService } from './facture.service';
import { CreateFactureDto } from './types/dtos/CreateFactureDto.dto';
import { UpdateFactureDto } from './types/dtos/UpdateFactureDto.dto';
import { RolesEnum } from '../staff/types/enums/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/RoleGuard.guard';
import { Roles } from '../shared/decorators/RoleDecorator.decorator';

@ApiTags('Factures')
@Controller('factures')
export class FactureController {
    constructor(private readonly factureService: FactureService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all factures' })
    getAll() {
        return this.factureService.getAllFactures();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get facture by id' })
    getById(@Param('id') id: string) {
        return this.factureService.getFactureById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new facture' })
    create(@Body() dto: CreateFactureDto) {
        return this.factureService.createFacture(dto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update facture' })
    update(@Param('id') id: string, @Body() dto: UpdateFactureDto) {
        return this.factureService.updateFacture(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete facture' })
    delete(@Param('id') id: string) {
        return this.factureService.deleteFacture(id);
    }
}

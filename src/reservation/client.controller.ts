import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/RoleGuard.guard';
import { RolesEnum } from '../staff/types/enums/role.enum';
import { Roles } from '../shared/decorators/RoleDecorator.decorator';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.RECEPTIONIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all clients' })
    getAllClients() {
        return this.clientService.getAllClients();
    }
}

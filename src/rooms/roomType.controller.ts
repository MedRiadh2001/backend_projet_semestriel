import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomTypeService } from './roomType.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/RoleGuard.guard';
import { RolesEnum } from '../staff/types/enums/role.enum';
import { Roles } from '../shared/decorators/RoleDecorator.decorator';
import { CreateRoomTypeDto } from './types/dtos/CreateRoomType.dto';
import { UpdateRoomTypeDto } from './types/dtos/UpdateRoomType.dto';

@ApiTags('Room Types')
@Controller('room-types')
export class RoomTypeController {
    constructor(private readonly roomTypeService: RoomTypeService) { }

    @Get()
    findAll() {
        return this.roomTypeService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @Post()
    create(@Body() dto: CreateRoomTypeDto) {
        return this.roomTypeService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRoomTypeDto) {
        return this.roomTypeService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.roomTypeService.delete(id);
    }
}

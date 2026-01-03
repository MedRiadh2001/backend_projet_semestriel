import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoomsService } from "./rooms.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../shared/guards/RoleGuard.guard";
import { RolesEnum } from "../staff/types/enums/role.enum";
import { Roles } from "../shared/decorators/RoleDecorator.decorator";
import { CreateRoomDto } from "./types/dtos/CreateRoomDto.dto";
import { UpdateRoomDto } from "./types/dtos/UpdateRoomDto.dto";

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomService: RoomsService) { }

    @Get()
    findAll() {
        return this.roomService.findAll();
    }

    // 🌍 PUBLIC (utilisé par client + réservation)
    @Get('available')
    findAvailable(@Query('roomTypeId') roomTypeId?: string) {
        return this.roomService.findAvailableRooms(roomTypeId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
    @ApiBearerAuth()
    @Post()
    create(@Body() dto: CreateRoomDto) {
        return this.roomService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
    @ApiBearerAuth()
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
        return this.roomService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.roomService.delete(id);
    }
}

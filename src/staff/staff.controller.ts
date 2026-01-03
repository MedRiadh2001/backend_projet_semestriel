import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './types/dtos/CreateStaffDto.dto';
import { UpdateStaffDto } from './types/dtos/UpdateStaffDto.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesEnum } from './types/enums/role.enum';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/RoleGuard.guard';
import { Roles } from '../shared/decorators/RoleDecorator.decorator';
import { ChangePasswordDto } from './types/dtos/ChangePasswordDto.dto';
import { ResetPasswordAdminDto } from './types/dtos/ResetPasswordAdminDto.dto';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all staff' })
    @ApiResponse({ status: 200, description: 'Return all staff members' })
    getAll() {
        return this.staffService.getAllStaff();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get staff by ID' })
    getById(@Param('id') id: string) {
        return this.staffService.getStaffById(id);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RolesEnum.ADMIN)
    // @ApiBearerAuth()
    // @Get('admin-only')
    // adminRoute() {
    //     return { message: 'Seul l’admin peut accéder à cette route' };
    // }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new staff' })
    create(@Body() createStaffDto: CreateStaffDto) {
        return this.staffService.createStaff(createStaffDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update existing staff' })
    update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
        return this.staffService.updateStaff(id, updateStaffDto);
    }

    @Patch('change-password')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change staff password' })
    changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
        return this.staffService.changePassword(req.user.id, dto);
    }

    @Patch('force-password')
    @UseGuards(JwtAuthGuard)
    async activateForgetPassword(@Req() req) {
        const staffId = req.user.id;
        return this.staffService.activateForgetPassword(staffId);
    }

    @Patch('reset-password/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Admin resets another user's password" })
    resetPassword(@Req() req, @Param('id') staffId: string, @Body() dto: ResetPasswordAdminDto) {
        return this.staffService.resetPasswordByAdmin(req.user.id, staffId, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete staff by ID' })
    delete(@Param('id') id: string) {
        return this.staffService.deleteStaff(id);
    }
}

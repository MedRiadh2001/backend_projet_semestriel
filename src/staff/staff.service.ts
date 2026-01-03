import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { StaffRepository } from './repository/Staff.repository';
import { IStaff } from './types/interfaces/IStaff.interface';
import * as bcrypt from 'bcrypt';
import { CreateStaffDto } from './types/dtos/CreateStaffDto.dto';
import { UpdateStaffDto } from './types/dtos/UpdateStaffDto.dto';
import { ChangePasswordDto } from './types/dtos/ChangePasswordDto.dto';
import { ResetPasswordAdminDto } from './types/dtos/ResetPasswordAdminDto.dto';
import { RolesEnum } from './types/enums/role.enum';

@Injectable()
export class StaffService {
    constructor(
        private readonly staffRepository: StaffRepository,
    ) { }

    async getAllStaff() {
        return this.staffRepository.find();
    }

    async getStaffById(id: string) {
        const staff = await this.staffRepository.findOne({ where: { id } });
        if (!staff) throw new NotFoundException(`Staff with id ${id} not found`);
        return staff;
    }

    async createStaff(createStaffDto: CreateStaffDto) {
        const { firstName, lastName, email, phone, role, password } = createStaffDto;
        const staffBody: Partial<IStaff> = {
            firstName,
            lastName,
            email,
            phone,
            role
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStaff = this.staffRepository.create({ ...staffBody, password: hashedPassword });
        return this.staffRepository.save(newStaff);
    }

    async updateStaff(id: string, updateStaffDto: UpdateStaffDto) {
        const staff = await this.getStaffById(id);

        const { firstName, lastName, email, phone, role } = updateStaffDto;

        if (firstName) { staff.firstName = firstName };
        if (lastName) { staff.lastName = lastName };
        if (email) { staff.email = email };
        if (phone) { staff.phone = phone };
        if (role) { staff.role = role };

        return this.staffRepository.save(staff);
    }

    async changePassword(staffId: string, dto: ChangePasswordDto) {
        const staff = await this.staffRepository.findOne({ where: { id: staffId } });
        if (!staff) throw new NotFoundException('Staff not found');

        const isMatch = await bcrypt.compare(dto.oldPassword, staff.password);
        if (!isMatch) throw new UnauthorizedException('Old password is incorrect');

        if (dto.newPassword !== dto.confirmNewPassword) {
            throw new BadRequestException('New password and confirmation do not match');
        }

        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        staff.password = hashedPassword;

        return this.staffRepository.save(staff);
    }

    async resetPasswordByAdmin(adminId: string, staffId: string, resetPasswordDtoAdmin: ResetPasswordAdminDto) {
        const admin = await this.staffRepository.findOne({ where: { id: adminId } });
        if (!admin) throw new NotFoundException('Admin not found');
        if (admin.role !== RolesEnum.ADMIN) throw new UnauthorizedException('Only admins can reset passwords');

        const staff = await this.staffRepository.findOne({ where: { id: staffId } });
        if (!staff) throw new NotFoundException('Staff not found');

        if (!staff.forgetPassword) {
            throw new BadRequestException(
                'Password reset by admin is not allowed for this user'
            );
        }

        const hashedPassword = await bcrypt.hash(resetPasswordDtoAdmin.newPassword, 10);
        staff.password = hashedPassword;

        staff.forgetPassword = false;

        console.log(`Admin ${admin.id} reset password for staff ${staff.id}`);

        return this.staffRepository.save(staff);
    }

    async activateForgetPassword(staffId: string) {
        const staff = await this.staffRepository.findOne({ where: { id: staffId } });
        if (!staff) throw new NotFoundException('Staff not found');

        staff.forgetPassword = true;
        return this.staffRepository.save(staff);
    }

    async deleteStaff(id: string) {
        const product = await this.getStaffById(id);
        this.staffRepository.delete(product.id);
        return ({ "deleted": true })
    }
}

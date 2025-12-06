import { Injectable, NotFoundException } from '@nestjs/common';
import { StaffRepository } from './repository/Staff.repository';
import { IStaff } from './types/interfaces/IStaff.interface';
import * as bcrypt from 'bcrypt';
import { CreateStaffDto } from './types/dtos/CreateStaffDto.dto';
import { UpdateStaffDto } from './types/dtos/UpdateStaffDto.dto';

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

    async deleteStaff(id: string) {
        const product = await this.getStaffById(id);
        this.staffRepository.delete(product.id);
        return ({ "deleted": true })
    }
}

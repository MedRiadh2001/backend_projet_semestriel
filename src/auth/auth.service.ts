import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffRepository } from 'src/staff/repository/Staff.repository';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './types/dtos/loginDto.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly staffRepository: StaffRepository,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const staff = await this.staffRepository.findOne({ where: { email } });
        if (!staff) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(password, staff.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        return staff;
    }

    async login(loginDto: LoginDto) {
        const staff = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { sub: staff.id, email: staff.email, role: staff.role };
        return { access_token: this.jwtService.sign(payload) };
    }
}

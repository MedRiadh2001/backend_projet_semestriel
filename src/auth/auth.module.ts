import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { Staff } from 'src/staff/entites/Staff.entity';
import { StaffModule } from 'src/staff/staff.module';
import { StaffRepository } from 'src/staff/repository/Staff.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'projetSemstrielSecretKey123456789',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, StaffRepository],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}

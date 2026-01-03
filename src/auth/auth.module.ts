import { forwardRef, Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../staff/entites/Staff.entity';
import { StaffRepository } from '../staff/repository/Staff.repository';

@Global()
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

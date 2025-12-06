import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffRepository } from './repository/Staff.repository';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  providers: [StaffService, StaffRepository],
  controllers: [StaffController],
  exports: [StaffService, StaffRepository],
})
export class StaffModule {}

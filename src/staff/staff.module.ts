import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffRepository } from './repository/Staff.repository';

@Module({
  providers: [StaffService, StaffRepository],
  controllers: [StaffController],
  exports: [StaffService, StaffRepository],
})
export class StaffModule {}

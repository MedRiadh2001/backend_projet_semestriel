import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/RoleGuard.guard';

@Module({
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class SharedModule { }

import { Global, Module } from '@nestjs/common';
import { RolesGuard } from './guards/RoleGuard.guard';

@Global()
@Module({
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class SharedModule { }

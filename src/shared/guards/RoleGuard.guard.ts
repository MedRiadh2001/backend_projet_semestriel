import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/RoleDecorator.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User from JWT:', user);  // <-- vérifier le rôle ici
    console.log('Required roles:', requiredRoles);

    if (!requiredRoles || requiredRoles.length === 0) return true;
    if (!user) return false;

    return requiredRoles.includes(user.role);
  }
}

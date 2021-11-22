import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        console.log(`RolesGuard: requiredRoles is [${requiredRoles}]!`);

        // const { user } = context.switchToHttp().getRequest();
        // console.log(`RolesGuard: user(${user}) role check over!`);

        const request = context.switchToHttp().getRequest();
        const jwt = request.headers['authorization']?.split(' ')[1];
        const user = jwt_decode(jwt) as any;
        console.log(`RolesGuard: user(${user.username})'s roles(${user.roles}) is being check over!`);

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}

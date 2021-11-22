import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private moduleRef: ModuleRef) {
        super({
            passReqToCallback: true,
        });
    }

    async validate(
        request: Request,
        username: string,
        password: string,
    ) {
        const contextId = ContextIdFactory.getByRequest(request);
        // "AuthService" is a request-scoped provider
        console.log(`LocalStrategy.validate: Is working for check user!`);
        const authService = await this.moduleRef.resolve(AuthService, contextId);
        const user = await authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException(`user is not found or wrong password!`);
        }
        return user;
    }

}

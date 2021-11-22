import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private readonly usersService: UsersService,) {
        super({
            // For chkecking token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        console.log(`JwtStrategy.validate: For chkecking token, payload is ${payload}`);
        const user = await this.usersService.findOne(payload.username);
        if (!user) {
            throw new UnauthorizedException('No such user');
        }
        return user;
    }
}

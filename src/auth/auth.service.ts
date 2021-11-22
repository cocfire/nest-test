import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            console.log(`AuthServic.validateUser: TO check user ${result.username}`);
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, roles: user.roles};
        console.log(`AuthService.login: Is working for login and return an new token!`);
        console.log(`AuthService.login: user ${user.username} login success! userId is ${user.userId}`);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
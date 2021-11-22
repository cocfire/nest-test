import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'tom',
                password: 'tom',
                roles: [Role.User]
            },
            {
                userId: 2,
                username: 'mike',
                password: 'mike',
                roles: [Role.User]
            },
            {
                userId: 3,
                username: 'jack',
                password: 'jack',
                roles: [Role.User]
            },
            {
                userId: 4,
                username: 'fire',
                password: 'cd',
                roles: [Role.User, Role.Admin]
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/users/user.dto';

@Resolver()
export class AppResolver {
    @Query(() => String) // 定义一个查询,并且返回字符类型
    hello() {
        return 'hello world';
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => User) // 定义一个查询,并且返回字符类型
    async nest(
        @Args('id', { type: () => String }) id: string,
        @Context() context: any,
        ) {
        const user : User = {
            roles: [Role.Admin],
            username: 'jet',
            password: '123'
        };
        console.log(context.req?.user, '请求头的数据')
        return user;
    }
}

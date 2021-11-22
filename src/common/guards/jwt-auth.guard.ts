
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // 在这里添加自定义的认证逻辑
        // 例如调用 super.logIn(request) 来建立一个session
        // super.logIn(context.request);
        console.log(`JwtAuthGuard.canActivate: .......`);
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // 可以抛出一个基于info或者err参数的异常
        console.log(`JwtAuthGuard.handleRequest: for redirection`);
        if (err || !user) {
            throw err || new UnauthorizedException(`user check fail`);
        }
        return user;
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}


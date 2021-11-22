import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validate.pipe';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppResolver } from './gql/app.resoler';

@Global()
@Module({
  imports: [
    CatsModule,
    DogsModule,
    MongooseModule.forRoot('mongodb://localhost/nest_test'),
    ConfigModule.forRoot(),
    AuthModule, 
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graph',
      context: ({ req }) => ({ req }), // 新增这行,将数据挂载到context上
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    AppService, AppResolver
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}

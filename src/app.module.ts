import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validate.pipe';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [CatsModule, DogsModule, MongooseModule.forRoot('mongodb://localhost/nest_test')],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}

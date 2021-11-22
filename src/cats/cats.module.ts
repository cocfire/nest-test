import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    AuthModule
  ],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) { }
}

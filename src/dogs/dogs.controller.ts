import { Body, Controller, Get, Post, UseInterceptors, UsePipes } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';

@Controller('dogs')
@UseInterceptors(TransformInterceptor)
export class DogsController {
  constructor(private catsService: CatsService) { }
  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Post()
  async addCat(@Body() cat: CreateCatDto): Promise<CreateCatDto> {
    this.catsService.create(cat);
    return cat;
  }
}

import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { ValidationPipe } from 'src/common/pipes/validate.pipe';

@Controller('dogs')
export class DogsController {
  constructor(private catsService: CatsService) {}
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

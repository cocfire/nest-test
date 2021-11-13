import { Body, Controller, ForbiddenException, Get, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): string {
    const cats = this.catsService.findAll();
    if (cats.length == 0) {
      return `Now you see, you don't have any cat!`;
    } else {
      let names = '';
      for (const cat of cats) {
        names += cat.name + ',';
      }
      names = names.substr(0, names.length - 1);
      console.log(names);
      if (cats.length == 1) {
        return `You have an cat, it is ${names}`;
      } else {
        return `You have ${cats.length} cats, they are ${names}`;
      }
    }
  }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async addCat(@Body() cat: CreateCatDto) {
    this.catsService.create(cat);
    return `Oh, you have got an new cat named ${cat.name}， age ${cat.age}!`;
  }

}

import { Body, Controller, ForbiddenException, Get, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Get()
  findAll(@User() user: any): string {
    const cats = this.catsService.findAll();
    console.log(`This is Catscontroller!`);
    console.log(`System has got an user named: ${user}!`);
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

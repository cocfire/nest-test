import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
    constructor(@InjectModel('Cat') private catModel: Model<CatDocument>) { }

    create(cat: CreateCatDto) {
        const createdCat = new this.catModel(cat);
        return createdCat.save();
    }

    findAll(): any {
        return this.catModel.find().exec();
    }
}

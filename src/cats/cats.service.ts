import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }

    async create(cat: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(cat);
        return createdCat.save();
    }

    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
    }
}

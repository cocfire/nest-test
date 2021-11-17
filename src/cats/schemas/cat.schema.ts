import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat extends Document {
    @Prop()
    name: string;

    @Prop()
    age: number;
}

export const CatsSchema = SchemaFactory.createForClass(Cat);

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    // ...other properties
    @Field(() => [String])
    roles: string[];

    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}

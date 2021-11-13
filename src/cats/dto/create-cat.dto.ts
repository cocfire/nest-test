import { IsNumber, IsString } from "class-validator";

/**
 * The definition of the cat
 */
export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;
}

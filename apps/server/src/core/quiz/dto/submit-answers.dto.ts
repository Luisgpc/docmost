import { IsArray, IsNumber, IsString } from 'class-validator';

export class SubmitAnswersDto {
  @IsString()
  userId: string;

  @IsArray()
  @IsNumber({}, { each: true })
  answers: number[];
}

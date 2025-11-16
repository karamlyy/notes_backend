import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Günün planı', maxLength: 200 })
  @IsString()
  @Length(1, 200)
  title: string;

  @ApiProperty({ example: 'Səhər idman, sonra kod yazmaq...' })
  @IsString()
  content: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteCatQueryDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  idx: number;
}

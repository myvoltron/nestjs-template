import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdateCatQueryDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  idx: number;
}

export class UpdateCatBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kind: string;
}
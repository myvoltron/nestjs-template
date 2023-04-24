import { ApiProperty } from '@nestjs/swagger';

export class GetCatsOkResponseDTO {
  @ApiProperty()
  idx: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  kind: string;

  @ApiProperty()
  createdDate: Date;
}

export class AddCatBodyDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  kind: string;
}

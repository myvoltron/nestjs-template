import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatsPath } from './cats.constant';
import { CatsService } from './cats.service';

@ApiTags(CatsPath.Root)
@Controller(CatsPath.Root)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @ApiOperation({ description: 'cat들을 조회합니다.' })
  @ApiOkResponse({ type: GetCatsOkResponseDTO, isArray: true })
  @Get()
  async getCats(): Promise<GetCatsOkResponseDTO[]> {
    return this.catsService.getCats();
  }

  @ApiOperation({ description: 'cat을 추가합니다.' })
  @ApiOkResponse({ type: GetCatsOkResponseDTO })
  @Post()
  async addCat(@Body() body: AddCatBodyDTO): Promise<GetCatsOkResponseDTO> {
    return this.catsService.addCat(body);
  }
}

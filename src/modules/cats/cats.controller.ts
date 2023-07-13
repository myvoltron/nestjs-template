import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatsPath } from './cats.constant';
import {
  AddCatBodyDTO,
  DeleteCatQueryDTO,
  GetCatsOkResponseDTO,
  UpdateCatBodyDTO,
  UpdateCatQueryDTO,
} from './cats.dto';
import { DeleteCatQueryPipe, UpdateCatQueryPipe } from './cats.pipe';
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

  @ApiOperation({ summary: 'update cats information' })
  @ApiOkResponse({ type: GetCatsOkResponseDTO })
  @Put(`/${CatsPath.Idx}`)
  async updateCat(@Query(UpdateCatQueryPipe) query: UpdateCatQueryDTO, @Body() body: UpdateCatBodyDTO) {
    this.catsService.updateCat(query, body);
  }

  @ApiOperation({ summary: 'delete cats' })
  @ApiOkResponse({ type: GetCatsOkResponseDTO })
  @Delete(`/${CatsPath.Idx}`)
  async deleteCat(@Query(DeleteCatQueryPipe) query: DeleteCatQueryDTO) {
    this.catsService.deleteCat(query);
  }
}

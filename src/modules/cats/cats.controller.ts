import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatsPath } from './cats.constant';
import { DeleteCatQueryPipe, UpdateCatQueryPipe } from './cats.pipe';
import { CatsService } from './cats.service';
import { GetCatsResponseDto } from './dtos/get-cats-response.dto';
import { AddCatBodyDto } from './dtos/add-cat-request.dto';
import { UpdateCatBodyDto, UpdateCatQueryDto } from './dtos/update-cat-request.dto';
import { DeleteCatQueryDto } from './dtos/delete-cat-request.dto';

@ApiTags(CatsPath.Root)
@Controller(CatsPath.Root)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @ApiOperation({ summary: '추가된 고양이 목록을 조회합니다.' })
  @ApiOkResponse({ type: [GetCatsResponseDto], isArray: true })
  @Get()
  async getCats(): Promise<GetCatsResponseDto[]> {
    const cats = await this.catsService.getCats();
    return cats.map((cat) => new GetCatsResponseDto(cat));
  }

  /**
   * @todo user 기능이 추가되었을 때, 회원 인가를 통해서 고양이 정보를 추가할 수 있도록 기능 추가가 필요
   */
  @ApiOperation({ summary: '고양이를 추가합니다.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addCat(@Body() body: AddCatBodyDto): Promise<void> {
    await this.catsService.addCat(body);
  }

  @ApiOperation({ summary: '기존에 추가되었던 고양이의 정보를 수정합니다.' })
  @Put(`/${CatsPath.Idx}`)
  async updateCat(@Query(UpdateCatQueryPipe) query: UpdateCatQueryDto, @Body() body: UpdateCatBodyDto): Promise<void> {
    await this.catsService.updateCat(query, body);
  }

  @ApiOperation({ summary: '기존에 추가되었던 고양이 정보를 삭제합니다.' })
  @Delete(`/${CatsPath.Idx}`)
  async deleteCat(@Query(DeleteCatQueryPipe) query: DeleteCatQueryDto): Promise<void> {
    await this.catsService.deleteCat(query);
  }
}

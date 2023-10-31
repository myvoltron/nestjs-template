import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersApiUrl } from './users.constant';
import { AddUserBodyDto } from './users-request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddUserResponseDto } from './dtos/add-user-response.dto';

@Controller(UsersApiUrl.Root)
@ApiTags(UsersApiUrl.Root)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ description: '회원을 추가합니다.' })
  @ApiCreatedResponse({ type: ApiCreatedResponse })
  async addUser(@Body() body: AddUserBodyDto): Promise<AddUserResponseDto> {
    const user = await this.usersService.addUser(body);
    return new AddUserResponseDto(user);
  }
}

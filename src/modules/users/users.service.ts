import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { AddUserBodyDto } from './users-request.dto';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async addUser(dto: AddUserBodyDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saltOrRounds = this.configService.get('HASH_SALT');
      const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
      const instance = this.usersRepository.createInstance({
        password: hashedPassword,
        ...dto,
      });
      const user = await this.usersRepository.addUser(instance, queryRunner.manager);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return user;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    }
  }
}

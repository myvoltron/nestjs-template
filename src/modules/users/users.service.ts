import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { AddUserBodyDto } from './users-request.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private readonly dataSource: DataSource) {}

  async addUser(dto: AddUserBodyDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const instance = this.usersRepository.createInstance(dto);
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

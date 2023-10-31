import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  createInstance(user: DeepPartial<User>): User {
    return this.repository.create(user);
  }

  async addUser(user: User, manager?: EntityManager): Promise<User> {
    if (manager) {
      return manager.save(User, user);
    } else {
      return this.repository.save(user);
    }
  }
}

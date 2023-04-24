import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { AddCatBodyDTO } from './cats.dto';
import { Cat } from './cats.entity';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private catsRepository: CatsRepository) {}

  createInstance(cat: DeepPartial<Cat>): Cat {
    return this.catsRepository.create(cat);
  }

  async getCats(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async addCat(cat: AddCatBodyDTO): Promise<Cat> {
    const catInstance = this.createInstance(cat);
    return this.catsRepository.save(catInstance);
  }
}

import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Cat } from './cats.entity';
import { CatsRepository } from './cats.repository';
import { AddCatBodyDto } from './dtos/add-cat-request.dto';
import { UpdateCatBodyDto, UpdateCatQueryDto } from './dtos/update-cat-request.dto';
import { DeleteCatQueryDto } from './dtos/delete-cat-request.dto';

@Injectable()
export class CatsService {
  constructor(private catsRepository: CatsRepository) {}

  createInstance(cat: DeepPartial<Cat>): Cat {
    return this.catsRepository.create(cat);
  }

  async getCats(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async addCat(dto: AddCatBodyDto): Promise<Cat> {
    const catInstance = this.createInstance(dto);
    return this.catsRepository.save(catInstance);
  }

  async updateCat(query: UpdateCatQueryDto, body: UpdateCatBodyDto) {
    return this.catsRepository.update({ idx: query.idx }, { name: body.name, kind: body.kind });
  }

  async deleteCat(query: DeleteCatQueryDto) {
    return this.catsRepository.softDelete({ idx: query.idx });
  }
}

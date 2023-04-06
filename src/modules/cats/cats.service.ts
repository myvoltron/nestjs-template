import { Injectable } from '@nestjs/common';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private catsRepository: CatsRepository) {}
}
